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
    title: "Products",
    url: "#",
    icon: LucidePackage,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Users",
    url: "#",
    icon: LucideUser,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
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