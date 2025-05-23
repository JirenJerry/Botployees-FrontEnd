// Third-party Imports

import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = (req, res) => {
  return {
    adapter: PrismaAdapter(prisma),

    // ** Configure one or more authentication providers
    // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
    providers: [
      CredentialProvider({
        // ** The name to display on the sign in form (e.g. 'Sign in with...')
        // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
        name: 'Credentials',
        type: 'credentials',

        /*
         * As we are using our own Sign-in page, we do not need to change
         * username or password attributes manually in following credentials object.
         */
        credentials: {},
        async authorize(credentials) {
          /*
           * You need to provide your own logic here that takes the credentials submitted and returns either
           * an object representing a user or value that is false/null if the credentials are invalid.
           * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
           * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
           */
          const { email, password } = credentials

          try {
            // ** Login API Call to match the user credentials and receive user data in response along with his role
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (res.status === 401) {
              throw new Error(JSON.stringify(data))
            }

            if (res.status === 200) {
              /*
               * Please unset all the sensitive information of the user either from API response or before returning
               * user data below. Below return statement will set the user object in the token and the same is set in
               * the session which will be accessible all over the app.
               */

              return data.data[0]
            }

            return null
          } catch (e) {
            throw new Error(e.message)
          }
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        authorization: {
          params: {
            access_type: 'offline',
            scope:
              'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
          }
        },
        async profile(profile) {
          return {
            id: profile.sub,
            role: profile.role ?? 'User',
            businessId: profile.businessId,
            email: profile.email,
            image: profile.picture,
            name: profile.name,
            currentPlan: profile.currentPlan ?? 'basicPlan'
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
      strategy: 'jwt',

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
      async jwt({ token, account, profile, trigger, session }) {
        if (trigger === 'update' && session?.currentEmployeeId) {
          token.currentEmployeeId = session.currentEmployeeId
        }

        if (account) {
          token.accessToken = account.access_token

          token.refreshToken = account.refresh_token
        }

        if (profile) {
          token.name = profile.name
          token.role = profile.role || 'User'
          token.businessId = profile.businessId
        }

        return token
      },

      //

      async session({ session, user, token, trigger, newSession }) {
        // Refresh token logic for Google provider:
        if (token && token.sub) {
          const googleAccounts = await prisma.account.findMany({
            where: { userId: token.sub, provider: 'google' }
          })

          const googleAccount = googleAccounts[0]

          if (googleAccount && googleAccount.expires_at * 1000 < Date.now()) {
            try {
              const response = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                body: new URLSearchParams({
                  client_id: process.env.GOOGLE_CLIENT_ID,
                  client_secret: process.env.GOOGLE_CLIENT_SECRET,
                  grant_type: 'refresh_token',
                  refresh_token: googleAccount.refresh_token
                })
              })

              const tokensOrError = await response.json()

              if (!response.ok) throw tokensOrError

              const newTokens = tokensOrError

              await prisma.account.update({
                data: {
                  access_token: newTokens.access_token,
                  expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                  refresh_token: newTokens.refresh_token || googleAccount.refresh_token
                },
                where: {
                  provider_providerAccountId: {
                    provider: 'google',
                    providerAccountId: googleAccount.providerAccountId
                  }
                }
              })
            } catch (error) {
              console.error('Error refreshing access_token', error)
              session.error = 'RefreshTokenError'
            }
          }
        }

        // Existing session logic to add token properties to the session:
        let userInfo = token

        if (session.user && userInfo) {
          if (userInfo.sub) {
            let userDB = await prisma.user.findUnique({ where: { id: userInfo.sub } })

            userDB.sub = userDB.id
            userInfo = userDB
          }

          session.user.name = userInfo.name
          session.user.id = userInfo.sub
          session.user.role = userInfo.role
          session.user.businessId = userInfo.businessId
          session.currentEmployeeId = token.currentEmployeeId
        }

        return session
      }
    }
  }
}
