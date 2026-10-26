export interface User {
  id: number
  email: string
  fullName: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationData extends LoginCredentials {
  fullName: string
}

export type AuthPageMode = 'login' | 'register'

export interface AuthLocationState {
  from?: string
  mode?: AuthPageMode
}
