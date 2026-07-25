import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../db.js'
import {
  AUTH_COOKIE,
  cookieOptions,
  getUserId,
  signToken,
} from '../auth.js'

export const authRouter = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function publicUser(user: {
  id: number
  email: string
  fullName: string
  createdAt: Date
}) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  }
}

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body as {
    fullName?: string
    email?: string
    password?: string
  }

  if (!fullName?.trim() || !email?.trim() || !password) {
    res.status(400).json({ error: 'fullName, email and password are required' })
    return
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Invalid email address' })
    return
  }
  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters' })
    return
  }

  const normalizedEmail = email.trim().toLowerCase()
  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })
  if (existing) {
    res.status(409).json({ error: 'An account with this email already exists' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email: normalizedEmail, passwordHash, fullName: fullName.trim() },
  })

  res
    .cookie(AUTH_COOKIE, signToken(user.id), cookieOptions())
    .status(201)
    .json(publicUser(user))
})

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as {
    email?: string
    password?: string
  }

  if (!email?.trim() || !password) {
    res.status(400).json({ error: 'email and password are required' })
    return
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  })
  const valid = user && (await bcrypt.compare(password, user.passwordHash))
  if (!valid) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  res
    .cookie(AUTH_COOKIE, signToken(user.id), cookieOptions())
    .json(publicUser(user))
})

// POST /api/auth/logout
authRouter.post('/logout', (_req, res) => {
  res.clearCookie(AUTH_COOKIE, { path: '/' }).json({ ok: true })
})

// GET /api/auth/me — current user or 401
authRouter.get('/me', async (req, res) => {
  const userId = getUserId(req)
  if (userId === null) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }
  res.json(publicUser(user))
})
