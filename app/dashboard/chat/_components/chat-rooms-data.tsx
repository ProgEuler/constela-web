import type { LucideIcon } from "lucide-react"
import { MessageSquare } from "lucide-react"

export type RoomStatus = "active" | "archived"

export type RoomMemberStatus = "member" | "blocked"

export type RoomMember = {
  id: string
  name: string
  email: string
  joinedDate: string
  status: RoomMemberStatus
  tone: "amber" | "violet" | "sky" | "rose" | "emerald" | "orange"
}

export type ChatRoom = {
  id: string
  name: string
  description: string
  type: "public" | "private"
  status: RoomStatus
  memberCount: number
  messageCount: number
  icon: LucideIcon
  iconBg: string
  iconColor: string
  createdBy: string
  createdAt: string
  members: RoomMember[]
}

export const roomStats = [
  { label: "Active Rooms", value: "3" },
  { label: "Total Members", value: "485" },
]

const sharedIcon: LucideIcon = MessageSquare

export const chatRooms: ChatRoom[] = [
  {
    id: "general-discussion",
    name: "General Discussion",
    description: "Open space for all users to connect and chat",
    type: "public",
    status: "active",
    memberCount: 248,
    messageCount: 1423,
    icon: sharedIcon,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    createdBy: "Admin Team",
    createdAt: "2026-05-01",
    members: [
      {
        id: "thomas-r",
        name: "Thomas R.",
        email: "thomas@example.com",
        joinedDate: "2026-05-02",
        status: "member",
        tone: "amber",
      },
      {
        id: "lucie-d",
        name: "Lucie D.",
        email: "lucie@example.com",
        joinedDate: "2026-05-10",
        status: "member",
        tone: "amber",
      },
      {
        id: "marc-b",
        name: "Marc B.",
        email: "marc@example.com",
        joinedDate: "2026-05-12",
        status: "blocked",
        tone: "violet",
      },
      {
        id: "emma-l",
        name: "Emma L.",
        email: "emma@example.com",
        joinedDate: "2026-05-15",
        status: "member",
        tone: "sky",
      },
    ],
  },
  {
    id: "neurodivergent-support",
    name: "Neurodivergent Support",
    description: "Safe space for sharing experiences and advice",
    type: "public",
    status: "active",
    memberCount: 64,
    messageCount: 892,
    icon: sharedIcon,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    createdBy: "Admin Team",
    createdAt: "2026-04-12",
    members: [],
  },
  {
    id: "dating-tips-advice",
    name: "Dating Tips & Advice",
    description: "Community tips for neurodivergent dating",
    type: "private",
    status: "active",
    memberCount: 132,
    messageCount: 567,
    icon: sharedIcon,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    createdBy: "Admin Team",
    createdAt: "2026-03-22",
    members: [],
  },
  {
    id: "anxiety-relationship",
    name: "Anxiety & Relationship",
    description: "Discussing anxiety in the context of dating",
    type: "private",
    status: "archived",
    memberCount: 41,
    messageCount: 234,
    icon: sharedIcon,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    createdBy: "Admin Team",
    createdAt: "2026-02-08",
    members: [],
  },
]
