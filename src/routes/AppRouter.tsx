import { createBrowserRouter, RouterProvider } from "react-router"

// Import Pages
import DashboardPage from "@/components/pages/dashboard/dashboard-page"

const router = createBrowserRouter([
  {
    "path": "/",
    "Component": DashboardPage
  }
])

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter