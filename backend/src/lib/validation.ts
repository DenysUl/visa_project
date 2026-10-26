const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value)
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

/** True for strings that contain non-whitespace characters */
export function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim())
}

/**
 * Reads string fields from an untrusted request body.
 * Non-string values are treated as missing.
 */
export function readStringFields<TKey extends string>(
  body: unknown,
  keys: readonly TKey[],
): Partial<Record<TKey, string>> {
  const source =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>)
      : {}
  const fields: Partial<Record<TKey, string>> = {}
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string') fields[key] = value
  }
  return fields
}
