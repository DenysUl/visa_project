import { HttpError } from '../../lib/http-error.js'
import {
  hasText,
  isValidEmail,
  readStringFields,
} from '../../lib/validation.js'

const MAX_DETAILS_JSON_LENGTH = 20_000

export interface SubmitApplicationInput {
  fullName: string
  email: string
  citizenship: string
  destinationCode: string
  details: string
}

function parseDetailsJson(body: unknown): string {
  if (typeof body !== 'object' || body === null) return '{}'
  const raw = (body as Record<string, unknown>).details
  if (raw === undefined || raw === null) return '{}'
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new HttpError(400, 'details must be an object')
  }
  const json = JSON.stringify(raw)
  if (json.length > MAX_DETAILS_JSON_LENGTH) {
    throw new HttpError(400, 'details is too large')
  }
  return json
}

export function parseSubmitApplicationInput(
  body: unknown,
): SubmitApplicationInput {
  const { fullName, email, citizenship, destinationCode } = readStringFields(
    body,
    ['fullName', 'email', 'citizenship', 'destinationCode'],
  )

  if (
    !hasText(fullName) ||
    !hasText(email) ||
    !hasText(citizenship) ||
    !hasText(destinationCode)
  ) {
    throw new HttpError(
      400,
      'fullName, email, citizenship and destinationCode are required',
    )
  }
  if (!isValidEmail(email)) {
    throw new HttpError(400, 'Invalid email address')
  }

  return {
    fullName: fullName.trim(),
    email: email.trim(),
    citizenship: citizenship.trim(),
    destinationCode: destinationCode.toUpperCase(),
    details: parseDetailsJson(body),
  }
}
