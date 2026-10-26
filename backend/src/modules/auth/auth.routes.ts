import { Router } from 'express'
import { asyncHandler } from '../../lib/async-handler.js'
import { HttpError } from '../../lib/http-error.js'
import type { AuthService } from './auth.service.js'
import {
  clearSessionCookie,
  readSessionUserId,
  setSessionCookie,
} from './auth.session.js'
import { parseLoginInput, parseRegisterInput } from './auth.validation.js'

export function createAuthRouter(authService: AuthService): Router {
  const router = Router()

  // POST /api/auth/register
  router.post(
    '/register',
    asyncHandler(async (req, res) => {
      const user = await authService.register(parseRegisterInput(req.body))
      setSessionCookie(res, user.id)
      res.status(201).json(user)
    }),
  )

  // POST /api/auth/login
  router.post(
    '/login',
    asyncHandler(async (req, res) => {
      const user = await authService.login(parseLoginInput(req.body))
      setSessionCookie(res, user.id)
      res.json(user)
    }),
  )

  // POST /api/auth/logout
  router.post('/logout', (_req, res) => {
    clearSessionCookie(res)
    res.json({ ok: true })
  })

  // GET /api/auth/me — current user or 401
  router.get(
    '/me',
    asyncHandler(async (req, res) => {
      const userId = readSessionUserId(req)
      const user =
        userId === null ? null : await authService.findUserById(userId)
      if (!user) throw new HttpError(401, 'Not authenticated')
      res.json(user)
    }),
  )

  return router
}
