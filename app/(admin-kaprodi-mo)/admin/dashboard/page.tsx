"use client"
import React from "react";
import { SiteHeader } from "@/components/site-header";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import { AdminDashboardContent } from "@/components/dashboard-content";
import useDashboardStore from "@/app/stores/dashboard-store";

const Page = () => {  

   const {fetchCourses} = useDashboardStore()

    React.useEffect(() => {
      fetchCourses("admin")
    },[fetchCourses])

  return (
    <SidebarInset>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards type={"admin"} />
           <div className="px-4 lg:px-6">
              <AdminDashboardContent/>
            </div> 
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
