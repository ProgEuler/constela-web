import type { LucideIcon } from "lucide-react"
import {
  BriefcaseBusiness,
  ShieldCheck,
  SquareUserRound,
  UserCog,
  UserRound,
} from "lucide-react"

export type UserStatus =
  | "Active"
  | "Pending invite"
  | "Deactivated"
  | "Locked"
  | "Suspended"

const teamValues = [
  "Platform",
  "Growth",
  "Revenue",
  "Customer Ops",
  "Internal Tools",
  "Compliance",
  "People Ops",
  "Finance",
] as const

export type UserTeam = (typeof teamValues)[number]

export type UserRow = {
  id: string
  name: string
  email: string
  joinedDate: string
  lastActive: number
  role: string
  status: UserStatus
  team: UserTeam
  workspace: string[]
  location?: string
  subscription?: string
  actions?: React.ReactNode
}

export const users: UserRow[] = [
  {
    id: "U001",
    name: "Olivia Rhye",
    email: "olivia.rhye@weblabs.studio",
    role: "Workspace Owner",
    location: "New York, USA",
    status: "Active",
    team: "Platform",
    subscription: "Pro Plan",
    workspace: ["Weblabs Studio", "Internal Tools"],
    joinedDate: "24 Jun 2024, 9:23 AM",
    lastActive: 0,
  },
  {
    id: "U002",
    name: "Phoenix Baker",
    email: "phoenix.baker@weblabs.studio",
    location: "San Francisco, USA",
    role: "Admin",
    status: "Active",
    team: "Growth",
    subscription: "Pro Plan",
    workspace: ["Weblabs Studio"],
    joinedDate: "15 Mar 2023, 2:45 PM",
    lastActive: 5,
  },
  {
    id: "U003",
    name: "Lana Steiner",
    email: "lana.steiner@acme.inc",
    location: "Austin, USA",
    role: "Billing Admin",
    subscription: "Pro Plan",
    status: "Active",
    team: "Revenue",
    workspace: ["Acme Inc."],
    joinedDate: "10 Apr 2022, 11:30 AM",
    lastActive: 14 * 24 * 60,
  },
  {
    id: "U004",
    name: "Demi Wilkinson",
    email: "demi.wilkinson@weblabs.studio",
    role: "Security Admin",
    location: "New York, USA",
    status: "Locked",
    team: "Internal Tools",
    workspace: ["Weblabs Studio", "Internal Tools"],
    joinedDate: "28 Feb 2023, 6:15 PM",
    lastActive: 60,
  },
  {
    id: "U005",
    name: "Candice Wu",
    email: "candice.wu@sandbox.dev",
    role: "Team Lead",
    status: "Active",
    location: "New York, USA",
    team: "Customer Ops",
    workspace: ["Sandbox"],
    joinedDate: "19 May 2024, 7:55 AM",
    lastActive: 2 * 60,
  },
  {
    id: "U006",
    name: "Natali Craig",
    email: "natali.craig@weblabs.studio",
    role: "Contributor",
    location: "San Deigo, USA",
    status: "Pending invite",
    team: "Compliance",
    workspace: ["Weblabs Studio"],
    joinedDate: "03 Jan 2024, 12:05 PM",
    lastActive: 90 * 24 * 60,
  },
  {
    id: "U007",
    name: "Drew Cano",
    email: "drew.cano@internal.tools",
    role: "Guest",
    location: "San Mateo, USA",
    status: "Active",
    team: "Internal Tools",
    workspace: ["Internal Tools"],
    joinedDate: "21 Jul 2023, 8:40 PM",
    lastActive: 3 * 60,
  },
  {
    id: "U008",
    name: "Orlando Diggs",
    email: "orlando.diggs@acme.inc",
    location: "Austin, USA",
    role: "Read-only",
    status: "Deactivated",
    team: "Revenue",
    workspace: ["Acme Inc."],
    joinedDate: "16 Sep 2023, 3:25 PM",
    lastActive: 6,
  },
  {
    id: "U009",
    name: "Andi Lane",
    email: "andi.lane@weblabs.studio",
    role: "Contributor",

    status: "Active",
    team: "People Ops",
    workspace: ["Weblabs Studio", "Sandbox"],
    joinedDate: "04 Nov 2022, 9:50 AM",
    lastActive: 12,
  },
  {
    id: "U010",
    name: "Kate Morrison",
    email: "kate.morrison@weblabs.studio",
    role: "Admin",
    status: "Active",
    team: "Platform",
    workspace: ["Weblabs Studio"],
    joinedDate: "30 Dec 2023, 4:35 PM",
    lastActive: 30,
  },
  {
    id: "U011",
    name: "Alec Whitten",
    email: "alec.whitten@internal.tools",
    role: "Team Lead",
    status: "Suspended",
    team: "Internal Tools",
    workspace: ["Internal Tools"],
    joinedDate: "12 Feb 2024, 10:20 AM",
    lastActive: 8 * 24 * 60,
  },
  {
    id: "U012",
    name: "Ariana Decker",
    email: "ariana.decker@weblabs.studio",
    role: "Contributor",
    status: "Active",
    team: "Growth",
    workspace: ["Weblabs Studio"],
    joinedDate: "08 Aug 2023, 1:10 PM",
    lastActive: 24 * 60,
  },
  {
    id: "U013",
    name: "Steven Tey",
    email: "steven.tey@sandbox.dev",
    role: "Guest",
    status: "Pending invite",
    team: "Customer Ops",
    workspace: ["Sandbox"],
    joinedDate: "17 Jan 2024, 5:45 PM",
    lastActive: 90 * 24 * 60,
  },
  {
    id: "U014",
    name: "Lori Bryson",
    email: "lori.bryson@acme.inc",
    role: "Billing Admin",
    status: "Active",
    team: "Finance",
    workspace: ["Acme Inc."],
    joinedDate: "02 Oct 2023, 11:15 AM",
    lastActive: 45,
  },
  {
    id: "U015",
    name: "Koray Okumus",
    email: "koray.okumus@weblabs.studio",
    role: "Security Admin",
    status: "Active",
    team: "Internal Tools",
    workspace: ["Weblabs Studio", "Internal Tools"],
    joinedDate: "22 May 2024, 8:30 AM",
    lastActive: 10,
  },
  {
    id: "U016",
    name: "Josh Miller",
    email: "josh.miller@internal.tools",
    role: "Read-only",
    status: "Active",
    team: "Compliance",
    workspace: ["Internal Tools"],
    joinedDate: "14 Jul 2023, 6:05 PM",
    lastActive: 4 * 60,
  },
  {
    id: "U017",
    name: "Mollie Hall",
    email: "mollie.hall@weblabs.studio",
    role: "Contributor",
    status: "Deactivated",
    team: "Platform",
    workspace: ["Weblabs Studio"],
    joinedDate: "26 Nov 2022, 3:40 PM",
    lastActive: 21 * 24 * 60,
  },
  {
    id: "U018",
    name: "Rene Wells",
    email: "rene.wells@acme.inc",
    role: "Team Lead",
    status: "Active",
    team: "Revenue",
    workspace: ["Acme Inc."],
    joinedDate: "11 Apr 2024, 9:05 AM",
    lastActive: 18,
  },
  {
    id: "U019",
    name: "Rylee Howard",
    email: "rylee.howard@sandbox.dev",
    role: "Guest",
    status: "Locked",
    team: "Growth",
    workspace: ["Sandbox"],
    joinedDate: "09 Sep 2023, 12:25 PM",
    lastActive: 2 * 24 * 60,
  },
  {
    id: "U020",
    name: "Sienna Hewitt",
    email: "sienna.hewitt@weblabs.studio",
    role: "Admin",
    status: "Active",
    team: "Internal Tools",
    workspace: ["Weblabs Studio", "Internal Tools"],
    joinedDate: "05 Dec 2023, 2:15 PM",
    lastActive: 0,
  },
  {
    id: "U021",
    name: "Noah Pierre",
    email: "noah.pierre@weblabs.studio",
    role: "Contributor",
    status: "Active",
    team: "Platform",
    workspace: ["Weblabs Studio"],
    joinedDate: "18 Jun 2024, 4:50 PM",
    lastActive: 7,
  },
  {
    id: "U022",
    name: "Eve Lechner",
    email: "eve.lechner@acme.inc",
    role: "Read-only",
    status: "Suspended",
    team: "Finance",
    workspace: ["Acme Inc."],
    joinedDate: "01 Mar 2023, 10:10 AM",
    lastActive: 30 * 24 * 60,
  },
  {
    id: "U023",
    name: "Zahir McClure",
    email: "zahir.mcclure@internal.tools",
    role: "Security Admin",
    status: "Active",
    team: "Internal Tools",
    workspace: ["Internal Tools"],
    joinedDate: "07 Feb 2024, 7:20 PM",
    lastActive: 60,
  },
  {
    id: "U024",
    name: "Mia Romberg",
    email: "mia.romberg@weblabs.studio",
    role: "Billing Admin",
    status: "Pending invite",
    team: "Finance",
    workspace: ["Weblabs Studio"],
    joinedDate: "29 Apr 2024, 11:55 AM",
    lastActive: 90 * 24 * 60,
  },
  {
    id: "U025",
    name: "Nico Arendt",
    email: "nico.arendt@sandbox.dev",
    role: "Contributor",
    status: "Active",
    team: "Customer Ops",
    workspace: ["Sandbox", "Internal Tools"],
    joinedDate: "13 May 2024, 6:35 PM",
    lastActive: 25,
  },
]

export const filters = {
  role: [
    "All",
    "Workspace Owner",
    "Admin",
    "Billing Admin",
    "Security Admin",
    "Team Lead",
    "Contributor",
    "Guest",
    "Read-only",
  ],
  team: ["All", ...teamValues],
  status: [
    "All",
    "Active",
    "Pending invite",
    "Deactivated",
    "Locked",
    "Suspended",
  ],
  workspace: [
    "All",
    "Weblabs Studio",
    "Sandbox",
    "Internal Tools",
    "Acme Inc.",
  ],
}

export const roleMeta: Record<string, { className: string; icon: LucideIcon }> =
  {
    "Workspace Owner": { className: "text-emerald-300", icon: SquareUserRound },
    Admin: { className: "text-amber-300", icon: UserCog },
    "Billing Admin": { className: "text-violet-300", icon: BriefcaseBusiness },
    "Security Admin": { className: "text-orange-300", icon: ShieldCheck },
    "Team Lead": { className: "text-fuchsia-300", icon: UserRound },
    Contributor: { className: "text-rose-300", icon: UserRound },
    Guest: { className: "text-muted-foreground", icon: UserRound },
    "Read-only": { className: "text-muted-foreground", icon: UserRound },
  }

export function getAvatarTone(name: string) {
  const tones = [
    "[&_[data-slot=avatar-fallback]]:bg-amber-100 [&_[data-slot=avatar-fallback]]:text-amber-700 after:border-amber-200 dark:[&_[data-slot=avatar-fallback]]:bg-amber-500/15 dark:[&_[data-slot=avatar-fallback]]:text-amber-300 dark:after:border-amber-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-orange-100 [&_[data-slot=avatar-fallback]]:text-orange-700 after:border-orange-200 dark:[&_[data-slot=avatar-fallback]]:bg-orange-500/15 dark:[&_[data-slot=avatar-fallback]]:text-orange-300 dark:after:border-orange-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-rose-100 [&_[data-slot=avatar-fallback]]:text-rose-700 after:border-rose-200 dark:[&_[data-slot=avatar-fallback]]:bg-rose-500/15 dark:[&_[data-slot=avatar-fallback]]:text-rose-300 dark:after:border-rose-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-pink-100 [&_[data-slot=avatar-fallback]]:text-pink-700 after:border-pink-200 dark:[&_[data-slot=avatar-fallback]]:bg-pink-500/15 dark:[&_[data-slot=avatar-fallback]]:text-pink-300 dark:after:border-pink-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-fuchsia-100 [&_[data-slot=avatar-fallback]]:text-fuchsia-700 after:border-fuchsia-200 dark:[&_[data-slot=avatar-fallback]]:bg-fuchsia-500/15 dark:[&_[data-slot=avatar-fallback]]:text-fuchsia-300 dark:after:border-fuchsia-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-purple-100 [&_[data-slot=avatar-fallback]]:text-purple-700 after:border-purple-200 dark:[&_[data-slot=avatar-fallback]]:bg-purple-500/15 dark:[&_[data-slot=avatar-fallback]]:text-purple-300 dark:after:border-purple-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-violet-100 [&_[data-slot=avatar-fallback]]:text-violet-700 after:border-violet-200 dark:[&_[data-slot=avatar-fallback]]:bg-violet-500/15 dark:[&_[data-slot=avatar-fallback]]:text-violet-300 dark:after:border-violet-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-indigo-100 [&_[data-slot=avatar-fallback]]:text-indigo-700 after:border-indigo-200 dark:[&_[data-slot=avatar-fallback]]:bg-indigo-500/15 dark:[&_[data-slot=avatar-fallback]]:text-indigo-300 dark:after:border-indigo-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-sky-100 [&_[data-slot=avatar-fallback]]:text-sky-700 after:border-sky-200 dark:[&_[data-slot=avatar-fallback]]:bg-sky-500/15 dark:[&_[data-slot=avatar-fallback]]:text-sky-300 dark:after:border-sky-500/20",
    "[&_[data-slot=avatar-fallback]]:bg-emerald-100 [&_[data-slot=avatar-fallback]]:text-emerald-700 after:border-emerald-200 dark:[&_[data-slot=avatar-fallback]]:bg-emerald-500/15 dark:[&_[data-slot=avatar-fallback]]:text-emerald-300 dark:after:border-emerald-500/20",
  ]

  return tones[name.length % tones.length]
}

export const statusMeta: Record<
  UserStatus,
  { badgeClass: string; dotClass: string }
> = {
  Active: {
    badgeClass:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  "Pending invite": {
    badgeClass:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  Deactivated: {
    badgeClass: "border-border bg-muted/50 text-muted-foreground",
    dotClass: "bg-muted-foreground",
  },
  Locked: {
    badgeClass: "border-destructive/20 bg-destructive/10 text-destructive",
    dotClass: "bg-destructive",
  },
  Suspended: {
    badgeClass:
      "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    dotClass: "bg-orange-500",
  },
}
