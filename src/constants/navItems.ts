import { LifeBuoy, LucidePackage, LucideUser, Send } from "lucide-react"
import type { IconType } from "react-icons/lib"
import { TbDashboard } from "react-icons/tb"

export interface Items {
  title: string
  url: string
  icon: IconType
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}[]

export const HOME_NAV_ITEMS: Items[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: TbDashboard
  }
]

export const MAIN_NAV_ITEMS: Items[] = [
  {
    title: "Produk",
    url: "#",
    icon: LucidePackage,
    items: [
      {
        title: "Semua Item",
        url: "#",
      },
      {
        title: "Best Seller",
        url: "#",
      },
      {
        title: "New Arrivals",
        url: "#",
      },
      {
        title: "Diskon",
        url: "#",
      }
    ],
  },
  {
    title: "Pengguna",
    url: "#",
    icon: LucideUser,
    items: [
      {
        title: "Genesis",
        url: "#",
      }
    ],
  },
]

export const SECONDARY_NAV_ITEMS: Items[] = [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ]