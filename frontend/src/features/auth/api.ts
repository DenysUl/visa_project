import { ApiError, apiRequest } from '@/lib/http'
import type { LoginCredentials, RegistrationData, User } from './types'

export const authApi = {
  /** Current session user, or `null` when signed out */
  async getCurrentUser(): Promise<User | null> {
    try {
      return await apiRequest<User>('/auth/me')
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null
      throw error
    }
  },

  login(credentials: LoginCredentials): Promise<User> {
    return apiRequest<User>('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  },

  register(data: RegistrationData): Promise<User> {
    return apiRequest<User>('/auth/register', { method: 'POST', body: data })
  },

  async logout(): Promise<void> {
    await apiRequest<{ ok: boolean }>('/auth/logout', { method: 'POST' })
  },
}
