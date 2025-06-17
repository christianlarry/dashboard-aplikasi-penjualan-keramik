import { useAuth } from "@/contexts/auth-context"
import { Navigate, useLocation } from "react-router"
import { Spinner } from "@/components/ui/spinner"
import { LoadingScreen } from "./loading-screen"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingScreen/>
  }

  if (!isAuthenticated) {
    // Redirect ke login dengan menyimpan intended URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
