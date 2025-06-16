import { createBrowserRouter, redirect, RouterProvider } from "react-router"

// Import Layout & Components
import MainLayout from "@/components/layouts/main-layout"
import { ProtectedRoute } from "@/components/common/protected-route"
import LoginPage from "@/components/pages/auth/login-page"

// Import Pages
import DashboardPage from "@/components/pages/dashboard/dashboard-page"
import AllProductsPage from "@/components/pages/products/all-products-page"
import BestSellerPage from "@/components/pages/products/best-seller-page"
import NewArrivalsPage from "@/components/pages/products/new-arrivals-page"
import DiscountPage from "@/components/pages/products/discount-page"
// import UserListPage from "@/components/pages/users/user-list-page"
// import AddUserPage from "@/components/pages/users/add-user-page"
// import UserRolesPage from "@/components/pages/users/user-roles-page"
// import UserSettingsPage from "@/components/pages/users/user-settings-page"
// import SupportPage from "@/components/pages/support/support-page"
// import FeedbackPage from "@/components/pages/feedback/feedback-page"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      // Products Routes
      { path: "products", loader: () => redirect("/products/all") },
      { path: "products/all", element: <AllProductsPage /> },
      { path: "products/best-seller", element: <BestSellerPage /> },
      { path: "products/new-arrivals", element: <NewArrivalsPage /> },
      { path: "products/discount", element: <DiscountPage /> },
      // Users Routes
      // { path: "users", loader: () => redirect("/users/list") },
      // { path: "users/list", element: <UserListPage /> },
      // { path: "users/add", element: <AddUserPage /> },
      // { path: "users/roles", element: <UserRolesPage /> },
      // { path: "users/settings", element: <UserSettingsPage /> },
      // Support & Feedback
      // { path: "support", element: <SupportPage /> },
      // { path: "feedback", element: <FeedbackPage /> }
    ]
  }
])

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter