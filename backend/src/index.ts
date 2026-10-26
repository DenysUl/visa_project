import { env } from './config/env.js'
import { createApp } from './app.js'
import { prisma } from './lib/prisma.js'

const app = createApp({ prisma })

const server = app.listen(env.port, () => {
  console.log(`API server running at http://localhost:${env.port}`)
})

function shutdown(signal: NodeJS.Signals): void {
  console.log(`${signal} received, shutting down`)
  server.close((closeError) => {
    if (closeError) console.error('Failed to close HTTP server', closeError)
    prisma
      .$disconnect()
      .catch((disconnectError: unknown) =>
        console.error('Failed to disconnect from database', disconnectError),
      )
      .finally(() => process.exit(closeError ? 1 : 0))
  })
}

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
