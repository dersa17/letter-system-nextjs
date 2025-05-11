"use client"
import * as React from 'react'
import { SiteHeader } from "@/components/site-header"
import { DataTable } from '@/components/data-table'
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import DialogCreateUpdate from '@/components/dialog-create-update'
import  UserForm  from '@/components/user-form'
import useUserStore from '@/app/stores/user-store'
import { Prisma } from '@prisma/client'
import { userColumns } from '@/components/columns'
import DialogDelete from '@/components/dialog-delete'

const Page = () => {
  const {users, fetchUsers, deleteUser} = useUserStore()
  const [isOpenDialogCreateUpdate, setOpenDialogCreateUpdate] = React.useState(false)
  const [isOpenDialogDelete, setOpenDialogDelete] = React.useState(false)
  const [dialogData, setDialogData] = React.useState<Prisma.UserGetPayload<{include: {
    role: true
    major: true
  }}> | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)


  React.useEffect (() => {
    fetchUsers()
  }, [fetchUsers])


  const handleOpenDialogCreateUpdate = (data: Prisma.UserGetPayload<{include: {
    role: true
    major: true
  }}> | null) => {
    setDialogData(data)
    setOpenDialogCreateUpdate(true)
  }

  const handleOpenDialogDelete = (id: string) => {
    setDeleteId(id)
    setOpenDialogDelete(true)
  }
 

  return (
    <SidebarInset>
      <SiteHeader title='User' />
        <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                        <DialogCreateUpdate open={isOpenDialogCreateUpdate} onOpenChange={setOpenDialogCreateUpdate} initialData={dialogData} type='User' >
                            <UserForm onClose={() => setOpenDialogCreateUpdate(false)} initialData={dialogData} ></UserForm>
                        </DialogCreateUpdate>
                        <DialogDelete open={isOpenDialogDelete} onOpenChange={setOpenDialogDelete} onDelete={() => deleteId !== null && deleteUser(deleteId)} ></DialogDelete>
                        <DataTable data={users} title='User' columns={userColumns(handleOpenDialogCreateUpdate, handleOpenDialogDelete)} onOpenDialog={handleOpenDialogCreateUpdate}/>
                      </div>
                    </div>
                  </div>
    </SidebarInset>
  )
}

export default Page;
