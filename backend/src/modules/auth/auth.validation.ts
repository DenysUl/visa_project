import { HttpError } from '../../lib/http-error.js'
import {
  hasText,
  isValidEmail,
  normalizeEmail,
  readStringFields,
} from '../../lib/validation.js'

export const MIN_PASSWORD_LENGTH = 8

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput extends LoginInput {
  fullName: string
}

export function parseRegisterInput(body: unknown): RegisterInput {
  const { fullName, email, password } = readStringFields(body, [
    'fullName',
    'email',
    'password',
  ])

  if (!hasText(fullName) || !hasText(email) || !password) {
    throw new HttpError(400, 'fullName, email and password are required')
  }
  if (!isValidEmail(email)) {
    throw new HttpError(400, 'Invalid email address')
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new HttpError(
      400,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    )
  }

  return {
    fullName: fullName.trim(),
    email: normalizeEmail(email),
    password,
  }
}

export function parseLoginInput(body: unknown): LoginInput {
  const { email, password } = readStringFields(body, ['email', 'password'])

  if (!hasText(email) || !password) {
    throw new HttpError(400, 'email and password are required')
  }

  return { email: normalizeEmail(email), password }
}
