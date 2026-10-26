import { Router } from 'express'
import { asyncHandler } from '../../lib/async-handler.js'
import { readSessionUserId } from '../auth/auth.session.js'
import { getAuthenticatedUserId, requireAuth } from '../auth/require-auth.js'
import type { ApplicationService } from './applications.service.js'
import { parseSubmitApplicationInput } from './applications.validation.js'

export function createApplicationsRouter(
  applicationService: ApplicationService,
): Router {
  const router = Router()

  // POST /api/applications — submit a new visa application.
  // If the request carries a valid auth cookie, the application
  // is linked to that user account.
  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const application = await applicationService.submit(
        parseSubmitApplicationInput(req.body),
        readSessionUserId(req),
      )
      res.status(201).json(application)
    }),
  )

  // GET /api/applications/mine — applications of the signed-in user
  router.get(
    '/mine',
    requireAuth,
    asyncHandler(async (_req, res) => {
      res.json(await applicationService.listForUser(getAuthenticatedUserId(res)))
    }),
  )

  // GET /api/applications — list applications (newest first)
  router.get(
    '/',
    asyncHandler(async (_req, res) => {
      res.json(await applicationService.listAll())
    }),
  )

  return router
}
