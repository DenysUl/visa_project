import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'

// In production this must come from the environment
export const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me'
export const AUTH_COOKIE = 'auth_token'

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

export function signToken(userId: number): string {
  return jwt.sign({ sub: String(userId) }, JWT_SECRET, {
    expiresIn: TOKEN_TTL_SECONDS,
  })
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: '/',
  }
}

export function getUserId(req: Request): number | null {
  const token = (req.cookies as Record<string, string> | undefined)?.[
    AUTH_COOKIE
  ]
  if (!token) return null
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (typeof payload === 'object' && payload.sub) {
      return Number(payload.sub)
    }
    return null
  } catch {
    return null
  }
}

/** Rejects the request when no valid auth cookie is present. */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = getUserId(req)
  if (userId === null) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }
  res.locals.userId = userId
  next()
}
