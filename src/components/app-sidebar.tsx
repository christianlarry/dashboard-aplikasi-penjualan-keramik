import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "./ui/logo/logo"
import { Link } from "react-router"
import NavHome from "./nav-home"

import { HOME_NAV_ITEMS, MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/constants/navItems"

// Data Sementara
const data = {
  user: {
    name: "christianlarry",
    role: "admin",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-24 items-center justify-center rounded-lg">
                  <Logo/>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavHome items={HOME_NAV_ITEMS} />
        <NavMain items={MAIN_NAV_ITEMS} />
        <NavSecondary items={SECONDARY_NAV_ITEMS} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
