import { Router } from 'express'
import { prisma } from '../db.js'
import { getUserId, requireAuth } from '../auth.js'

export const applicationsRouter = Router()

// POST /api/applications — submit a new visa application.
// If the request carries a valid auth cookie, the application
// is linked to that user account.
applicationsRouter.post('/', async (req, res) => {
  const { fullName, email, citizenship, destinationCode } = req.body as {
    fullName?: string
    email?: string
    citizenship?: string
    destinationCode?: string
  }

  if (!fullName?.trim() || !email?.trim() || !citizenship?.trim() || !destinationCode?.trim()) {
    res.status(400).json({
      error: 'fullName, email, citizenship and destinationCode are required',
    })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email address' })
    return
  }

  const destination = await prisma.destination.findUnique({
    where: { code: destinationCode.toUpperCase() },
  })
  if (!destination) {
    res.status(404).json({ error: 'Destination not found' })
    return
  }

  const application = await prisma.application.create({
    data: {
      fullName: fullName.trim(),
      email: email.trim(),
      citizenship: citizenship.trim(),
      destinationCode: destination.code,
      userId: getUserId(req),
    },
  })
  res.status(201).json(application)
})

// GET /api/applications/mine — applications of the signed-in user
applicationsRouter.get('/mine', requireAuth, async (_req, res) => {
  const userId = res.locals.userId as number
  const rows = await prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { destination: { select: { name: true, code: true } } },
  })
  res.json(rows)
})

// GET /api/applications — list applications (newest first)
applicationsRouter.get('/', async (_req, res) => {
  const rows = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
    include: { destination: { select: { name: true, code: true } } },
  })
  res.json(rows)
})
