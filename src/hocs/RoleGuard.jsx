// Third-party Imports
import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

// Component Imports
import RoleRedirect from '@/components/RoleRedirect'

export default async function AuthGuard({ children, locale }) {
  const session = await getServerSession(authOptions)

  return <>{session?.user?.role === 'Admin' ? children : <RoleRedirect lang={locale} />}</>
}
