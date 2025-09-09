"use client"
import React from "react";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import { KaprodiDashboardContent } from "@/components/dashboard-content";
import useDashboardStore from "@/app/stores/dashboard-store";


const Page = () => {

    const {data, fetchCourses} = useDashboardStore()

    React.useEffect(() => {
      fetchCourses("kaprodi")
    },[fetchCourses])
    console.log(data)

  return (
    <SidebarInset>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards type="kaprodi" />
            <div className="px-4 lg:px-6">
               <KaprodiDashboardContent/>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
