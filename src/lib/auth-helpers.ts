import { auth } from '@/auth'
import { UserRole } from '@/lib/permissions'

export async function getCurrentUser() {
  const session = await auth()
  if (!session?.user) return null
  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name,
    image: session.user.image,
    role: (session.user as any).role as UserRole,
    status: (session.user as any).status as string,
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'admin' && user.role !== 'super_admin') {
    throw new Error('Forbidden')
  }
  return user
}
