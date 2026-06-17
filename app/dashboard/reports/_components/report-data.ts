export type ReportPriority = "Low" | "Medium" | "High" | "Critical"
export type ReportStatus = "Open" | "In Progress" | "Resolved"

export type ReportRow = {
  reportId: string
  reportedUser: string
  reason: string
  priority: ReportPriority
  reportedBy: string
  history: string
  time: string
  status: ReportStatus
  details?: string
  evidenceCount?: number
}

export const priorityMeta: Record<
  ReportPriority,
  { className: string; label: string }
> = {
  Low: {
    className:
      "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400",
    label: "Low",
  },
  Medium: {
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    label: "Medium",
  },
  High: {
    className:
      "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    label: "High",
  },
  Critical: {
    className:
      "border-destructive/20 bg-destructive/10 text-destructive",
    label: "Critical",
  },
}

export const allReports: ReportRow[] = [
  {
    reportId: "RPT-001",
    reportedUser: "Drew Cano",
    reason: "Inappropriate content",
    priority: "High",
    reportedBy: "Olivia Rhye",
    history: "2 previous reports",
    time: "2 hours ago",
    status: "Open",
    details: "User posted explicit content in a public channel multiple times despite previous warnings.",
    evidenceCount: 3,
  },
  {
    reportId: "RPT-002",
    reportedUser: "Alec Whitten",
    reason: "Harassment",
    priority: "Critical",
    reportedBy: "Phoenix Baker",
    history: "5 previous reports",
    time: "4 hours ago",
    status: "In Progress",
    details: "Repeatedly sending threatening messages to multiple team members across different channels.",
    evidenceCount: 8,
  },
  {
    reportId: "RPT-003",
    reportedUser: "Eve Lechner",
    reason: "Spam",
    priority: "Low",
    reportedBy: "Candice Wu",
    history: "No previous reports",
    time: "6 hours ago",
    status: "Open",
    details: "User posting promotional content in discussion channels not related to work.",
    evidenceCount: 1,
  },
  {
    reportId: "RPT-004",
    reportedUser: "Orlando Diggs",
    reason: "Impersonation",
    priority: "High",
    reportedBy: "Natali Craig",
    history: "1 previous report",
    time: "8 hours ago",
    status: "Open",
    details: "Using a fake profile with another employee's name and photo to mislead team members.",
    evidenceCount: 4,
  },
  {
    reportId: "RPT-005",
    reportedUser: "Rylee Howard",
    reason: "Sharing confidential info",
    priority: "Critical",
    reportedBy: "Steven Tey",
    history: "No previous reports",
    time: "12 hours ago",
    status: "In Progress",
    details: "Shared internal financial documents with unauthorized external parties through personal email.",
    evidenceCount: 6,
  },
  {
    reportId: "RPT-006",
    reportedUser: "Mollie Hall",
    reason: "Inappropriate content",
    priority: "Medium",
    reportedBy: "Mia Romberg",
    history: "3 previous reports",
    time: "1 day ago",
    status: "Open",
    details: "Uploading offensive images to shared workspace resources that violate company policy.",
    evidenceCount: 2,
  },
  {
    reportId: "RPT-007",
    reportedUser: "Josh Miller",
    reason: "Harassment",
    priority: "Medium",
    reportedBy: "Lana Steiner",
    history: "No previous reports",
    time: "1 day ago",
    status: "Open",
    details: "Making inappropriate comments about a colleague's personal life during team meetings.",
    evidenceCount: 3,
  },
  {
    reportId: "RPT-008",
    reportedUser: "Koray Okumus",
    reason: "Spam",
    priority: "Low",
    reportedBy: "Demi Wilkinson",
    history: "No previous reports",
    time: "2 days ago",
    status: "Resolved",
    details: "Sending mass unsolicited messages to team members about personal side projects.",
    evidenceCount: 1,
  },
  {
    reportId: "RPT-009",
    reportedUser: "Sienna Hewitt",
    reason: "Impersonation",
    priority: "High",
    reportedBy: "Nico Arendt",
    history: "2 previous reports",
    time: "2 days ago",
    status: "Resolved",
    details: "Created a support account posing as IT admin to request password resets from other users.",
    evidenceCount: 5,
  },
  {
    reportId: "RPT-010",
    reportedUser: "Noah Pierre",
    reason: "Sharing confidential info",
    priority: "Critical",
    reportedBy: "Kate Morrison",
    history: "1 previous report",
    time: "3 days ago",
    status: "Resolved",
    details: "Posted proprietary source code on a public GitHub repository containing sensitive algorithms.",
    evidenceCount: 7,
  },
  {
    reportId: "RPT-011",
    reportedUser: "Lori Bryson",
    reason: "Inappropriate content",
    priority: "Medium",
    reportedBy: "Andi Lane",
    history: "No previous reports",
    time: "3 days ago",
    status: "Resolved",
    details: "Shared inappropriate memes in the company-wide announcements channel.",
    evidenceCount: 2,
  },
  {
    reportId: "RPT-012",
    reportedUser: "Zahir McClure",
    reason: "Spam",
    priority: "Low",
    reportedBy: "Ariana Decker",
    history: "No previous reports",
    time: "5 days ago",
    status: "Resolved",
    details: "Repeatedly posting affiliate links in discussion forums under multiple accounts.",
    evidenceCount: 1,
  },
]

export const myCases: ReportRow[] = allReports.filter(
  (r) => r.status === "Open" || r.status === "In Progress"
)

export const resolvedReports: ReportRow[] = allReports.filter(
  (r) => r.status === "Resolved"
)
