import { Router } from 'express'
import { prisma } from '../db.js'

export const destinationsRouter = Router()

// GET /api/destinations — list all destinations
destinationsRouter.get('/', async (_req, res) => {
  const rows = await prisma.destination.findMany({ orderBy: { id: 'asc' } })
  res.json(
    rows.map((d) => ({ ...d, documents: JSON.parse(d.documents) as string[] })),
  )
})

// GET /api/destinations/:code — single destination by country code
destinationsRouter.get('/:code', async (req, res) => {
  const code = req.params.code.toUpperCase()
  const row = await prisma.destination.findUnique({ where: { code } })
  if (!row) {
    res.status(404).json({ error: 'Destination not found' })
    return
  }
  res.json({ ...row, documents: JSON.parse(row.documents) as string[] })
})
