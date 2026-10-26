const DEFAULT_API_BASE_URL = '/api'

/**
 * GitHub Pages is static hosting: there is no Express/SQLite backend.
 * Production builds without an explicit API origin run fully in the browser
 * (auth and applications in localStorage) so POST /api/* does not 405.
 */
const useLocalData =
  import.meta.env.VITE_USE_LOCAL_DATA === 'true' ||
  (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL)

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
  useLocalData,
} as const
