// Third-party Imports
import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

export default async function AuthGuard({ children, locale }) {
  const session = await getServerSession(authOptions)
  
  return <>{session ? children : <AuthRedirect lang={locale} />}</>
}
