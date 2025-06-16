import { LucidePackage } from "lucide-react"
import { TbDashboard } from "react-icons/tb"

export interface NavItem {
  title: string
  url: string
  icon?: any
  items?: NavItem[]
}

export const HOME_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: TbDashboard
  }
]

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Produk",
    url: "/products",
    icon: LucidePackage,
    items: [
      {
        title: "Semua Item",
        url: "/products/all",
      },
      {
        title: "Best Seller",
        url: "/products/best-seller",
      },
      {
        title: "New Arrivals",
        url: "/products/new-arrivals",
      },
      {
        title: "Diskon",
        url: "/products/discount",
      }
    ],
  },
  // {
  //   title: "Pengguna",
  //   url: "/users",
  //   icon: LucideUser,
  //   items: [
  //     {
  //       title: "Daftar Pengguna",
  //       url: "/users/list",
  //     },
  //     {
  //       title: "Tambah Pengguna",
  //       url: "/users/add",
  //     },
  //     {
  //       title: "Role & Permissions",
  //       url: "/users/roles",
  //     },
  //     {
  //       title: "Pengaturan User",
  //       url: "/users/settings",
  //     }
  //   ],
  // },
]

// export const SECONDARY_NAV_ITEMS: NavItem[] = [
//   {
//     title: "Support",
//     url: "/support",
//     icon: LifeBuoy,
//   },
//   {
//     title: "Feedback",
//     url: "/feedback",
//     icon: Send,
//   },
// ]