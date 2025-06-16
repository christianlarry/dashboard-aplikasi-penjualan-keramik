import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { AuthContextType, LoginCredentials, User } from '@/types/auth'
import api from '@/lib/api'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Get user data from JWT token
function getUserFromToken(token: string): User | null {
  try {
    return jwtDecode<User>(token)
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      const userData = getUserFromToken(storedToken)
      if (userData) {
        setToken(storedToken)
        setUser(userData)
      } else {
        // If token is invalid or expired, clear everything
        localStorage.removeItem('token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    // API hanya mengembalikan token
    const { data: { token } } = await api.post<{ token: string }>('/user/login', credentials)
    
    // Get user data from JWT payload
    const userData = getUserFromToken(token)
    if (!userData) {
      throw new Error('Invalid token received from server')
    }

    // Save token to localStorage
    localStorage.setItem('token', token)

    // Update state with token and decoded user data
    setToken(token)
    setUser(userData)
    
    // Set loading to false after login
    setIsLoading(false)

    return { user: userData, token }
  }, [])

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('token')

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
