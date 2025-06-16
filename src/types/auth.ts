export interface User {
  id: string
  username: string
  email: string
  role: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}
