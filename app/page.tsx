"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const roleRedirectMap: Record<number, string> = {
  1: "/admin/dashboard",
  2: "/mo/dashboard",
  3: "/kaprodi/dashboard",
  4: "/mahasiswa/home",
};


export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated") {
      const roleId = session?.user?.role?.id;
      const redirectPath = roleRedirectMap[roleId] || "/login";
      router.replace(redirectPath);
    }
  }, [status, session, router]);

  return null
}
