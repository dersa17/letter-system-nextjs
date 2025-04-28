"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

import {
  Icon, IconMail, IconProps, IconNote, IconUser, IconBook, IconSchool,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

}




const menuAdmin = [
  {title: "Dashboard", url: "/admin/dashboard", icon: IconDashboard },
  { title: "Course", url: "/admin/course", icon: IconBook },
  { title: "Major", url: "/admin/major", icon: IconSchool },
  { title: "User", url: "/admin/user", icon: IconUser },
]
const menuKaprodi = [
  {title: "Dashboard", url: "/kaprodi/dashboard", icon: IconDashboard },
  { title: "Letter", url: "/kaprodi/letter", icon: IconNote },
]
const menuMo = [
  {title: "Dashboard", url: "/mo/dashboard", icon: IconDashboard },
  { title: "Letter", url: "/mo/letter", icon: IconNote },
]

let menu: { title: string; url: string; icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>> }[] | { title: string; url: string; icon?: Icon }[];


export function AppSidebar({role, ...props }: React.ComponentProps<typeof Sidebar>) {

  if (role === "Admin") {
    menu = menuAdmin
  } else if (role == "Kepala Program Studi") {
    menu = menuKaprodi
  } else if (role == "Manager Operasional") {
    menu = menuMo
  }


  return (



    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem  className="flex items-center justify-between gap-2">
                <span className="text-xl font-semibold !p-1.5">{role}</span>
      
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
