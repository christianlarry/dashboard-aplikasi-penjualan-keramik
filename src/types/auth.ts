import type { loginSchema } from "@/validations/authSchema"
import type { z } from "zod"

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  role: string
}

export type LoginCredentials = z.infer<typeof loginSchema>
export interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<{ user: User; token: string }>
  logout: () => void
}
