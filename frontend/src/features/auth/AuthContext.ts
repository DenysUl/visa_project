import { createContext } from 'react'
import type { User } from './types'

export interface AuthContextValue {
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

export const AuthContext = createContext<AuthContextValue | null>(null)
