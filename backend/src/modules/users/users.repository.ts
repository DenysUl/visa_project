import type { PrismaClient, User } from '@prisma/client'

export interface NewUser {
  email: string
  passwordHash: string
  fullName: string
}

export interface UserRepository {
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: NewUser): Promise<User>
}

export function createUserRepository(prisma: PrismaClient): UserRepository {
  return {
    findById: (id) => prisma.user.findUnique({ where: { id } }),
    findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
    create: (user) => prisma.user.create({ data: user }),
  }
}
