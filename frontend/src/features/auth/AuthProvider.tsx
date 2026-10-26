import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authApi } from './api'
import { AuthContext, type AuthContextValue } from './AuthContext'
import type { User } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authApi
      .getCurrentUser()
      .then(setUser)
      // Backend unreachable — treat as signed out
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setUser(await authApi.login({ email, password }))
  }, [])

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      setUser(await authApi.register({ fullName, email, password }))
    },
    [],
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // Local sign-out must succeed even when the server is unreachable
      console.warn('Logout request failed', error)
    }
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
