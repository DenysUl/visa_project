import bcrypt from 'bcryptjs'
import { env } from '../../config/env.js'
import { HttpError } from '../../lib/http-error.js'
import { toPublicUser, type PublicUser } from '../users/public-user.js'
import type { UserRepository } from '../users/users.repository.js'
import type { LoginInput, RegisterInput } from './auth.validation.js'

export interface AuthService {
  register(input: RegisterInput): Promise<PublicUser>
  login(input: LoginInput): Promise<PublicUser>
  findUserById(userId: number): Promise<PublicUser | null>
}

interface AuthServiceDependencies {
  users: UserRepository
}

export function createAuthService({
  users,
}: AuthServiceDependencies): AuthService {
  return {
    async register({ fullName, email, password }) {
      if (await users.findByEmail(email)) {
        throw new HttpError(409, 'An account with this email already exists')
      }
      const passwordHash = await bcrypt.hash(
        password,
        env.auth.passwordSaltRounds,
      )
      const user = await users.create({ email, passwordHash, fullName })
      return toPublicUser(user)
    },

    async login({ email, password }) {
      const user = await users.findByEmail(email)
      const isValid =
        user !== null && (await bcrypt.compare(password, user.passwordHash))
      if (!user || !isValid) {
        throw new HttpError(401, 'Invalid email or password')
      }
      return toPublicUser(user)
    },

    async findUserById(userId) {
      const user = await users.findById(userId)
      return user ? toPublicUser(user) : null
    },
  }
}
