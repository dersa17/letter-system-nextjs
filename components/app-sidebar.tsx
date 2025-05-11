"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { getSession } from "next-auth/react"
import {
  Icon, IconMail, IconProps, IconUser, IconBook, IconSchool,
  IconDashboard,
  IconFile,
} from "@tabler/icons-react"
import { Prisma } from "@prisma/client"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
}

const menuAdmin = [
  {title: "Dashboard", url: "/admin/dashboard", icon: IconDashboard },
  { title: "Course", url: "/admin/course", icon: IconBook },
  { title: "Major", url: "/admin/major", icon: IconSchool },
  { title: "User", url: "/admin/user", icon: IconUser },
]
const menuKaprodi = [
  {title: "Dashboard", url: "/kaprodi/dashboard", icon: IconDashboard },
  { title: "Letter", url: "/kaprodi/letter", icon: IconFile },
]
const menuMo = [
  {title: "Dashboard", url: "/mo/dashboard", icon: IconDashboard },
  { title: "Letter", url: "/mo/letter", icon: IconFile },
]

type User = Prisma.UserGetPayload<{include:{
  role: true
  major: true
}}> & {
  emailVerified: Date | null; // Menambahkan properti emailVerified
};
interface Session {
    user: User; 
  }

type MenuItem = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

export function AppSidebar({...props }: React.ComponentProps<typeof Sidebar>) {
  const [session, setSession] = React.useState<Session | null>(null); 
  const [menu, setMenu] = React.useState<MenuItem[]>([]); 

  React.useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);

      if (session?.user?.idRole === 1) {
        setMenu(menuAdmin);
      } else if (session?.user?.idRole === 2) {
        setMenu(menuKaprodi);
      } else if (session?.user?.idRole === 3) {
        setMenu(menuMo);
      }

      data.user.name = session?.user?.nama ?? ""
      data.user.email = session?.user?.email ?? ""
      data.user.avatar = session?.user?.image ?? ""
    };

    fetchSession();
  }, []);

   if (!session) {
    return <div>Loading...</div>; // Tampilkan loading jika session belum ada
  }

  return (



    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem  className="flex items-center justify-between gap-2">
                <span className="text-xl font-semibold !p-1.5">{session?.user?.role?.nama}</span>
      
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
