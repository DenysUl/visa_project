import { Router } from 'express'
import { asyncHandler } from '../../lib/async-handler.js'
import type { DestinationService } from './destinations.service.js'

export function createDestinationsRouter(
  destinationService: DestinationService,
): Router {
  const router = Router()

  // GET /api/destinations — list all destinations
  router.get(
    '/',
    asyncHandler(async (_req, res) => {
      res.json(await destinationService.list())
    }),
  )

  // GET /api/destinations/:code — single destination by country code
  router.get(
    '/:code',
    asyncHandler(async (req, res) => {
      res.json(await destinationService.getByCode(req.params.code))
    }),
  )

  return router
}
