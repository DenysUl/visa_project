import { env } from '@/config/env'
import { ApiError, apiRequest } from '@/lib/http'
import { localAuthApi } from './local-api'
import type { LoginCredentials, RegistrationData, User } from './types'

const remoteAuthApi = {
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

export const authApi = env.useLocalData ? localAuthApi : remoteAuthApi
