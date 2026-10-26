import type { User } from '@prisma/client'

/** User fields that are safe to send to clients */
export type PublicUser = Pick<User, 'id' | 'email' | 'fullName' | 'createdAt'>

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  }
}
