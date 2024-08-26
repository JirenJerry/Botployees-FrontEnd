// Third-party Imports

import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = (req, res) => {
  return {
    adapter: PrismaAdapter(prisma),

    // ** Configure one or more authentication providers
    // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
    providers: [

      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      

        async profile(profile) {

          return {
            id: profile.sub
            , role: profile.role ?? "User"
            , businessId: profile.businessId
            , email: profile.email
            , image: profile.picture
            , name: profile.name
          }
        }
      })

      // ** ...add more providers here
    ],

    // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
    session: {
      /*
       * Choose how you want to save the user session.
       * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
       * If you use an `adapter` however, NextAuth default it to `database` instead.
       * You can still force a JWT session by explicitly defining `jwt`.
       * When using `database`, the session cookie will only contain a `sessionToken` value,
       * which is used to look up the session in the database.
       * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
       * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
       */
      strategy: 'database',

      // ** Seconds - How long until an idle session expires and is no longer valid
      maxAge: 30 * 24 * 60 * 60 // ** 30 days
    },

    // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
    pages: {
      signIn: '/login'
    },

    // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
    callbacks: {
      /*
       * While using `jwt` as a strategy, `jwt()` callback will be called before
       * the `session()` callback. So we have to add custom parameters in `token`
       * via `jwt()` callback to make them accessible in the `session()` callback
       */
      async jwt({ token, trigger, user }) {

        if (user) {
          /*
           * For adding custom parameters to user in session, we first need to add those parameters
           * in token which then will be available in the `session()` callback
           */

          token.name = user.name
          token.role = user.role || 'User'
          token.businessId = user.businessId
        }

        return token
      },
      async signIn({ user, account, profile, email, credentials }) {
    
        if (user && user.email) {
         
          // If you're using db sessions and not logging in for first time then id = userId (UUID),
          // else id = providerAccountId (string).
          // With OAuth, account will (always?) be account from provider, not db.

          // If you are already a user and have linked your account,
          // then logging out will only destroy cookie and delete session.
          // It will *not* update your account with updated info from callback.
          // Since we don't know which id we have it's best to do lookup again.
         
          let userdb = await prisma.user.findUnique({ where: { id: user.id } })
          
          if (userdb) {
            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              data: {
                access_token: account.access_token,
                expires_at: account.expires_at,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
                session_state: account.session_state,
                scope: account.scope,
              },
            });
          }

        }
        
        return true;
      },
      async session({ session, user, trigger }) {

        if (session.user) {

          // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
          session.user.name = user.name
          session.user.role = user.role
          session.user.businessId = user.businessId

        }

        return session
      }
    }
  }
}
