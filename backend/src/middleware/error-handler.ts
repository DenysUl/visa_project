import type { ErrorRequestHandler, RequestHandler } from 'express'
import { HttpError } from '../lib/http-error.js'

/** body-parser marks malformed JSON payloads with this type */
function isMalformedJsonError(error: unknown): boolean {
  return (
    error instanceof SyntaxError &&
    'type' in error &&
    error.type === 'entity.parse.failed'
  )
}

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Not found' })
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message })
    return
  }
  if (isMalformedJsonError(error)) {
    res.status(400).json({ error: 'Invalid JSON body' })
    return
  }
  console.error('Unhandled request error', error)
  res.status(500).json({ error: 'Internal server error' })
}
