import type { RequestHandler, Response } from 'express'
import { HttpError } from '../../lib/http-error.js'
import { readSessionUserId } from './auth.session.js'

const USER_ID_LOCAL_KEY = 'userId'

/** Rejects the request when no valid auth cookie is present */
export const requireAuth: RequestHandler = (req, res, next) => {
  const userId = readSessionUserId(req)
  if (userId === null) {
    next(new HttpError(401, 'Authentication required'))
    return
  }
  res.locals[USER_ID_LOCAL_KEY] = userId
  next()
}

/** Id of the user authenticated by `requireAuth` */
export function getAuthenticatedUserId(res: Response): number {
  const userId: unknown = res.locals[USER_ID_LOCAL_KEY]
  if (typeof userId !== 'number') {
    throw new Error('requireAuth must run before getAuthenticatedUserId')
  }
  return userId
}
