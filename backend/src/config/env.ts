import path from 'node:path'
import { fileURLToPath } from 'node:url'

export interface AppEnv {
  nodeEnv: string
  isProduction: boolean
  port: number
  corsOrigin: string
  databaseUrl: string
  auth: {
    jwtSecret: string
    sessionTtlSeconds: number
    passwordSaltRounds: number
  }
}

const DEFAULT_PORT = 3001
const DEFAULT_CORS_ORIGIN = 'http://localhost:5173'
const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days
const DEFAULT_PASSWORD_SALT_ROUNDS = 10
const DEFAULT_SQLITE_URL = 'file:./dev.db'
const DEV_JWT_SECRET = 'dev-secret-change-me'
const BACKEND_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
)

function isMissingFileError(error: unknown): boolean {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}

/** Loads `.env` from the working directory when it exists */
function loadDotEnvFile(): void {
  try {
    process.loadEnvFile()
  } catch (error) {
    if (!isMissingFileError(error)) throw error
  }
}

function readInteger(name: string, fallback: number): number {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  const value = Number(raw)
  if (!Number.isInteger(value)) {
    throw new Error(`Environment variable ${name} must be an integer, got "${raw}"`)
  }
  return value
}

/** Prisma CLI resolves `file:./dev.db` against `prisma/`; the client uses cwd. Pin an absolute path. */
function resolveDatabaseUrl(raw: string | undefined): string {
  const url = raw && raw !== '' ? raw : DEFAULT_SQLITE_URL
  if (!url.startsWith('file:')) return url
  const filePath = url.slice('file:'.length)
  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(BACKEND_ROOT, 'prisma', filePath)
  return `file:${absolute.replaceAll('\\', '/')}`
}

function readJwtSecret(isProduction: boolean): string {
  const secret = process.env.JWT_SECRET
  if (secret) return secret
  if (isProduction) throw new Error('JWT_SECRET must be set in production')
  return DEV_JWT_SECRET
}

function readEnv(): AppEnv {
  loadDotEnvFile()
  const nodeEnv = process.env.NODE_ENV ?? 'development'
  const isProduction = nodeEnv === 'production'
  const databaseUrl = resolveDatabaseUrl(process.env.DATABASE_URL)
  process.env.DATABASE_URL = databaseUrl

  return {
    nodeEnv,
    isProduction,
    port: readInteger('PORT', DEFAULT_PORT),
    corsOrigin: process.env.CORS_ORIGIN || DEFAULT_CORS_ORIGIN,
    databaseUrl,
    auth: {
      jwtSecret: readJwtSecret(isProduction),
      sessionTtlSeconds: readInteger(
        'SESSION_TTL_SECONDS',
        DEFAULT_SESSION_TTL_SECONDS,
      ),
      passwordSaltRounds: readInteger(
        'PASSWORD_SALT_ROUNDS',
        DEFAULT_PASSWORD_SALT_ROUNDS,
      ),
    },
  }
}

export const env: AppEnv = readEnv()
