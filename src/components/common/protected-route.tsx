import { useAuth } from "@/contexts/auth-context"
import { Navigate, useLocation } from "react-router"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    // Anda bisa ganti dengan loading spinner atau skeleton
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect ke login dengan menyimpan intended URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
