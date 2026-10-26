function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export const localStore = {
  get<T>(key: string, fallback: T): T {
    return readJson(key, fallback)
  },
  set(key: string, value: unknown): void {
    writeJson(key, value)
  },
  remove(key: string): void {
    localStorage.removeItem(key)
  },
}
