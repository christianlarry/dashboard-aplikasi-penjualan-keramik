import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { AuthContextType, LoginCredentials, User } from '@/types/auth'
import api from '@/lib/api'
import { AxiosError } from 'axios'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await api.post('/auth/login', credentials)
      const { user, token } = response.data

      // Save to localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // Update state
      setUser(user)
      setToken(token)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Login failed')
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Clear state
    setUser(null)
    setToken(null)

    // Redirect to login
    window.location.href = '/login'
  }, [])

  // Provide the auth context value
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
