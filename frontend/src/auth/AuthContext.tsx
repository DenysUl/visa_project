import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export interface User {
  id: number
  email: string
  fullName: string
  createdAt: string
}

interface AuthContextValue {
  user: User | null
  /** True while the initial session check is in flight */
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function parseError(res: Response): Promise<string> {
  const body = (await res.json().catch(() => null)) as {
    error?: string
  } | null
  return body?.error ?? `Request failed (${res.status})`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) setUser((await res.json()) as User)
      })
      .catch(() => {
        // Backend unreachable — treat as signed out
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error(await parseError(res))
    setUser((await res.json()) as User)
  }, [])

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName, email, password }),
      })
      if (!res.ok) throw new Error(await parseError(res))
      setUser((await res.json()) as User)
    },
    [],
  )

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {})
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
