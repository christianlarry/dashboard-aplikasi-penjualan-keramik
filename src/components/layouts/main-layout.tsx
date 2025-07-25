import React from "react"
import { AppSidebar } from "@/components/common/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link, Outlet, useLocation } from "react-router"
import { Toaster } from "../ui/sonner"

interface BreadcrumbItem {
  label: string
  href?: string
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  "/": [{ label: "Dashboard" }],
  "/products": [{ label: "Produk" }],
  "/products/all": [
    { label: "Produk", href: "/products" },
    { label: "Semua Item" },
  ],
  "/products/best-seller": [
    { label: "Produk", href: "/products" },
    { label: "Best Seller" },
  ],
  "/products/new-arrivals": [
    { label: "Produk", href: "/products" },
    { label: "New Arrivals" },
  ],
  "/products/discount": [
    { label: "Produk", href: "/products" },
    { label: "Diskon" },
  ],
  "/users": [{ label: "Pengguna" }],
  "/users/list": [
    { label: "Pengguna", href: "/users" },
    { label: "Daftar Pengguna" },
  ],
  "/users/add": [
    { label: "Pengguna", href: "/users" },
    { label: "Tambah Pengguna" },
  ],
  "/users/roles": [
    { label: "Pengguna", href: "/users" },
    { label: "Role & Permissions" },
  ],
  "/users/settings": [
    { label: "Pengguna", href: "/users" },
    { label: "Pengaturan User" },
  ],
  "/support": [{ label: "Support" }],
  "/feedback": [{ label: "Feedback" }],
}

const MainLayout = () => {
  const location = useLocation()
  const items = breadcrumbMap[location.pathname] || []

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link to={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="font-semibold">{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {idx < items.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-6">
          <Outlet />
        </div>
      </SidebarInset>

      <Toaster 
        position="top-center"
      />
    </SidebarProvider>
  )
}

export default MainLayout