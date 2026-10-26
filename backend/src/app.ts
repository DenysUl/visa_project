import express, { type Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import type { PrismaClient } from '@prisma/client'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/error-handler.js'
import { createApplicationRepository } from './modules/applications/applications.repository.js'
import { createApplicationsRouter } from './modules/applications/applications.routes.js'
import { createApplicationService } from './modules/applications/applications.service.js'
import { createAuthRouter } from './modules/auth/auth.routes.js'
import { createAuthService } from './modules/auth/auth.service.js'
import { createDestinationRepository } from './modules/destinations/destinations.repository.js'
import { createDestinationsRouter } from './modules/destinations/destinations.routes.js'
import { createDestinationService } from './modules/destinations/destinations.service.js'
import { createUserRepository } from './modules/users/users.repository.js'

export interface AppDependencies {
  prisma: PrismaClient
}

export function createApp({ prisma }: AppDependencies): Express {
  const users = createUserRepository(prisma)
  const destinations = createDestinationRepository(prisma)
  const applications = createApplicationRepository(prisma)

  const authService = createAuthService({ users })
  const destinationService = createDestinationService({ destinations })
  const applicationService = createApplicationService({
    applications,
    destinations,
  })

  const app = express()

  app.use(cors({ origin: env.corsOrigin, credentials: true }))
  app.use(express.json())
  app.use(cookieParser())

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/auth', createAuthRouter(authService))
  app.use('/api/destinations', createDestinationsRouter(destinationService))
  app.use('/api/applications', createApplicationsRouter(applicationService))

  app.use('/api', notFoundHandler)
  app.use(errorHandler)

  return app
}
