import type { ReactNode } from "react"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { AppSidebar } from "@/app/dashboard/_components/sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  CONTENT_LAYOUT_VALUES,
  NAVBAR_STYLE_VALUES,
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
} from "@/lib/preferences/layout"
import { THEME_MODE_VALUES, THEME_PRESET_VALUES } from "@/lib/preferences/theme"
import { cn } from "@/lib/utils"
import { getPreference } from "@/server/server-actions"
import { getSession } from "@/server/auth/session"
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider"
import { RoleContextProvider } from "@/components/auth/role-context"

import { AccountSwitcher } from "./_components/sidebar/account-switcher"
import { SearchDialog } from "./_components/sidebar/search-dialog"
import { ThemeSwitcher } from "./_components/sidebar/theme-switcher"

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Auth gate — runs after middleware, but acts as defence-in-depth
  // and provides the session data used by the sidebar.
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"
  const [
    variant,
    collapsible,
    themeMode,
    themePreset,
    contentLayout,
    navbarStyle,
  ] = await Promise.all([
    getPreference("sidebar_variant", SIDEBAR_VARIANT_VALUES, "inset"),
    getPreference("sidebar_collapsible", SIDEBAR_COLLAPSIBLE_VALUES, "icon"),
    getPreference("theme_mode", THEME_MODE_VALUES, "light"),
    getPreference("theme_preset", THEME_PRESET_VALUES, "default"),
    getPreference("content_layout", CONTENT_LAYOUT_VALUES, "centered"),
    getPreference("navbar_style", NAVBAR_STYLE_VALUES, "sticky"),
  ])

  return (
    <PreferencesStoreProvider
      themeMode={themeMode}
      themePreset={themePreset}
      contentLayout={contentLayout}
      navbarStyle={navbarStyle}
    >
      <RoleContextProvider role={session.role}>
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 68)",
            } as React.CSSProperties
          }
        >
          <AppSidebar
            variant={variant}
            collapsible={collapsible}
            selectedRole={session.role}
          />
          <SidebarInset
            className={cn(
              "[html[data-content-layout=centered]_&>*]:mx-auto",
              "[html[data-content-layout=centered]_&>*]:w-full",
              "[html[data-content-layout=centered]_&>*]:max-w-screen-2xl",
              "peer-data-[variant=inset]:border",
              "[--dashboard-header-height:--spacing(12)]",
              "min-w-0 overflow-x-hidden"
            )}
          >
            <header
              className={cn(
                "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
                // Handle sticky navbar style with conditional classes so blur, background, z-index, and rounded corners remain consistent across all SidebarVariant layouts.
                "[html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-50 [html[data-navbar-style=sticky]_&]:overflow-hidden [html[data-navbar-style=sticky]_&]:rounded-t-[inherit] [html[data-navbar-style=sticky]_&]:bg-background/50 [html[data-navbar-style=sticky]_&]:backdrop-blur-md"
              )}
            >
              <div className="flex w-full items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-1 lg:gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
                  />
                  <SearchDialog />
                </div>
                <div className="flex items-center gap-2">
                  <ThemeSwitcher />
                  <AccountSwitcher
                    users={[
                      {
                        id: session.userId,
                        name: session.userId,
                        email: "",
                        avatar: "",
                        role: session.role,
                      },
                    ]}
                  />
                </div>
              </div>
            </header>
            {/* Pages can set data-content-padding="false" to render full-bleed app layouts. */}
            <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden bg-muted p-4 has-data-[content-padding=false]:p-0 md:p-6 md:has-data-[content-padding=false]:p-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </RoleContextProvider>
    </PreferencesStoreProvider>
  )
}