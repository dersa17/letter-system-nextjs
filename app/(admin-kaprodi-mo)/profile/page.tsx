"use client"
import React from 'react'
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProfileForm from '@/components/profile-from'
const Page = () => {
  return (
    <SidebarInset>
      <SiteHeader title='Profile' />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <ProfileForm/>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}

export default Page;
