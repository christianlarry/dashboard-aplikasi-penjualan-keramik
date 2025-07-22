import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { AuthContextType, LoginCredentials, User } from '@/types/auth'
import api from '@/lib/api'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Get user data from JWT token
const getUserFromToken = (token: string): User | null => {
  try {
    return jwtDecode<User>(token)
  } catch {
    return null
  }
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    return decoded.exp * 1000 < Date.now() // Convert exp to milliseconds
  } catch {
    return true // If decoding fails, consider token expired
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const whenTokenExpired = useCallback(() => {
    // Clear token and user if token is expired
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }, [])

  // Load user from token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {

      // Check if the token is expired
      if (isTokenExpired(storedToken)) {
        // If token is expired, clear it
        whenTokenExpired()

        return
      } else { // If token is valid, decode it to get user data
        const userData = getUserFromToken(storedToken)
        if (userData) {
          setToken(storedToken)
          setUser(userData)
        } else {
          // If token is invalid or expired, clear everything
          localStorage.removeItem('token')
        }
      }
    }

    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      // API hanya mengembalikan token
      const { data: { data: { token } } } = await api.post<{ data: { token: string } }>('/user/login', credentials)

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

      return { user: userData, token }
    } finally{
      setIsLoading(false)
    }
    
  }, [])

  const logout = useCallback(() => {
    // Clear token and user from localStorage and state
    whenTokenExpired()

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
