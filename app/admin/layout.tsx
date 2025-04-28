import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"



const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <SidebarProvider
    style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }
  >
    <AppSidebar variant="inset" role="Admin" />
   {children} 
  </SidebarProvider>
  )
}

export default layout