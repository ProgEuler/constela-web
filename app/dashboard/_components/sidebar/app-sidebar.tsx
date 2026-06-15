"use client"

import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { APP_CONFIG } from "@/config/app-config"
import { rootUser } from "@/data/users"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { sidebarItems } from "@/navigation/sidebar-items"
import { NavGroup } from "@/navigation/sidebar-items"
import type { RoleSlug } from "@/navigation/roles"
import { getNavItemsForRole } from "@/navigation/roles"
import Image from "next/image"
import logo from "@/assets/svg/logo.svg"

function buildNavGroupsForRole(slug: RoleSlug): NavGroup[] {
  const items = getNavItemsForRole(slug)
  return [
    {
      id: 1,
      items: items.map((item) => ({
        title: item.title,
        url: item.url,
        icon: item.icon,
      })),
    },
  ]
}

export function AppSidebar({
  selectedRole,
  ...props
}: React.ComponentProps<typeof Sidebar> & { selectedRole?: RoleSlug }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link prefetch={false} href="/">
                {/* <Command /> */}
                <Image
                  src={logo}
                  alt="Logo"
                  width={64}
                  height={64}
                />
                <span className="text-base font-semibold">
                  {APP_CONFIG.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            selectedRole ? buildNavGroupsForRole(selectedRole) : sidebarItems
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
