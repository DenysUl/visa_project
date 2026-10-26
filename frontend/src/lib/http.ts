import { env } from '@/config/env'

export type ApiErrorKind = 'http' | 'network'

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  /** HTTP status code; `null` when the server could not be reached */
  readonly status: number | null

  constructor(
    message: string,
    kind: ApiErrorKind,
    status: number | null,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
}

interface ErrorResponseBody {
  error?: string
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ErrorResponseBody | null
    if (body?.error) return body.error
  } catch {
    // Non-JSON error body: fall through to the generic message
  }
  return `Request failed (${response.status})`
}

export async function apiRequest<TResponse>(
  path: string,
  { method = 'GET', body }: RequestOptions = {},
): Promise<TResponse> {
  let response: Response
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      method,
      credentials: 'include',
      headers:
        body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (cause) {
    throw new ApiError('Network request failed', 'network', null, { cause })
  }

  if (!response.ok) {
    throw new ApiError(
      await readErrorMessage(response),
      'http',
      response.status,
    )
  }
  return (await response.json()) as TResponse
}

/**
 * Message suitable for showing to the user: server-provided errors are
 * passed through, connectivity problems are replaced with `networkFallback`.
 */
export function getErrorMessage(
  error: unknown,
  networkFallback: string,
): string {
  if (error instanceof ApiError && error.kind === 'network') {
    return networkFallback
  }
  return error instanceof Error ? error.message : networkFallback
}
