import jwt from 'jsonwebtoken'
import type { CookieOptions, Request, Response } from 'express'
import { env } from '../../config/env.js'

export const AUTH_COOKIE = 'auth_token'
const AUTH_COOKIE_PATH = '/'

function sessionCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.isProduction,
    maxAge: env.auth.sessionTtlSeconds * 1000,
    path: AUTH_COOKIE_PATH,
  }
}

function createSessionToken(userId: number): string {
  return jwt.sign({ sub: String(userId) }, env.auth.jwtSecret, {
    expiresIn: env.auth.sessionTtlSeconds,
  })
}

export function setSessionCookie(res: Response, userId: number): void {
  res.cookie(AUTH_COOKIE, createSessionToken(userId), sessionCookieOptions())
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE, { path: AUTH_COOKIE_PATH })
}

/** User id from a valid session cookie, or `null` when absent/invalid/expired */
export function readSessionUserId(req: Request): number | null {
  const cookies = req.cookies as Record<string, string> | undefined
  const token = cookies?.[AUTH_COOKIE]
  if (!token) return null

  try {
    const payload = jwt.verify(token, env.auth.jwtSecret)
    if (typeof payload !== 'object' || !payload.sub) return null
    const userId = Number(payload.sub)
    return Number.isInteger(userId) ? userId : null
  } catch (error) {
    // Covers malformed, tampered and expired tokens
    if (error instanceof jwt.JsonWebTokenError) return null
    throw error
  }
}
