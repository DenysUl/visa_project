import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { destinationsRouter } from './routes/destinations.js'
import { applicationsRouter } from './routes/applications.js'
import { authRouter } from './routes/auth.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3001)

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/applications', applicationsRouter)

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
