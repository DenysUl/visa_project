import { ApiError } from '@/lib/http'
import { hashPassword } from '@/lib/password-hash'
import { localStore } from '@/lib/local-store'
import type { LoginCredentials, RegistrationData, User } from './types'

const USERS_KEY = 'visa.local.users'
const SESSION_KEY = 'visa.local.sessionUserId'
const MIN_PASSWORD_LENGTH = 8

interface StoredUser {
  id: number
  email: string
  fullName: string
  passwordHash: string
  createdAt: string
}

function toPublicUser(user: StoredUser): User {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  }
}

function loadUsers(): StoredUser[] {
  return localStore.get<StoredUser[]>(USERS_KEY, [])
}

function saveUsers(users: StoredUser[]): void {
  localStore.set(USERS_KEY, users)
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function getLocalSessionUserId(): number | null {
  const id = localStore.get<number | null>(SESSION_KEY, null)
  return typeof id === 'number' ? id : null
}

export function getLocalSessionUser(): User | null {
  const userId = getLocalSessionUserId()
  if (userId === null) return null
  const user = loadUsers().find((item) => item.id === userId)
  return user ? toPublicUser(user) : null
}

export const localAuthApi = {
  async getCurrentUser(): Promise<User | null> {
    return getLocalSessionUser()
  },

  async login({ email, password }: LoginCredentials): Promise<User> {
    const user = loadUsers().find(
      (item) => item.email === normalizeEmail(email),
    )
    const passwordHash = await hashPassword(password)
    if (!user || user.passwordHash !== passwordHash) {
      throw new ApiError('Invalid email or password', 'http', 401)
    }
    localStore.set(SESSION_KEY, user.id)
    return toPublicUser(user)
  },

  async register({
    fullName,
    email,
    password,
  }: RegistrationData): Promise<User> {
    const normalizedEmail = normalizeEmail(email)
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new ApiError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
        'http',
        400,
      )
    }
    const users = loadUsers()
    if (users.some((item) => item.email === normalizedEmail)) {
      throw new ApiError(
        'An account with this email already exists',
        'http',
        409,
      )
    }
    const user: StoredUser = {
      id: (users.at(-1)?.id ?? 0) + 1,
      email: normalizedEmail,
      fullName: fullName.trim(),
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    }
    saveUsers([...users, user])
    localStore.set(SESSION_KEY, user.id)
    return toPublicUser(user)
  },

  async logout(): Promise<void> {
    localStore.remove(SESSION_KEY)
  },
}
