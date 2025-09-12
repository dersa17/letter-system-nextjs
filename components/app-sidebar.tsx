"use client"

import * as React from "react"
import { getSession } from "next-auth/react"
import {
  Icon, IconProps, IconUser, IconBook, IconSchool,
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
import useProfileStore from "@/app/stores/profile-store"
import { NotificationDropdown } from "./notification-dropdown"

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
  const [userDisplay, setUserDisplay] = React.useState({
    name: "",
    email: "",
    avatar: "",
  });
  const { profile, fetchProfile } = useProfileStore();

  // Fetch session dan set menu
  React.useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      setSession(sess as Session);

      if (sess?.user?.role.id === 1) setMenu(menuAdmin);
      else if (sess?.user?.role.id === 2) setMenu(menuMo);
      else if (sess?.user?.role.id === 3) setMenu(menuKaprodi);

      setUserDisplay(prev => ({
        ...prev,
        email: sess?.user?.email ?? "",
      }));
    };
    fetchSession();
  }, []);

  // Fetch profile
  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Update nama user dari profile setelah fetch
  React.useEffect(() => {
    if (profile) {
      setUserDisplay(prev => ({
        ...prev,
        name: profile.nama ?? "",
        avatar: profile.image ?? "",
      }));
    }
  }, [profile]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between gap-2">
            <span className="text-xl font-semibold !p-1.5">{session?.user?.role?.nama}</span>
            {session?.user?.role.id !== 1 && (
                <NotificationDropdown/>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userDisplay} />
      </SidebarFooter>
    </Sidebar>
  );
}
