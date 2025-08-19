import * as React from "react"

import { NavMain } from "@/components/common/sidebar/nav-main"
import { NavUser } from "@/components/common/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "../../ui/logo/logo"
import { Link } from "react-router"
import NavHome from "@/components/common/sidebar/nav-home"

import { HOME_NAV_ITEMS, MAIN_NAV_ITEMS } from "@/constants/navItems"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square items-center justify-center rounded-lg">
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
        {/* <NavSecondary items={SECONDARY_NAV_ITEMS} className="mt-auto" /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
