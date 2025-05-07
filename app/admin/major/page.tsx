"use client"
import * as React from 'react'
import { SiteHeader } from "@/components/site-header"
import { DataTable } from "@/components/data-table"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import { majorColumns } from '@/components/columns'
import DialogCreateUpdate from '@/components/dialog-create-update'
import  MajorForm  from '@/components/major-form'
import {Prisma} from "@prisma/client"
import useMajorStore  from '@/app/stores/major-store'
import DialogDelete  from '@/components/dialog-delete'


const Page =  () => {

  const { majors, fetchMajors, deleteMajor } = useMajorStore();
  const [isOpenDialogCreateUpdate, setOpenDialogCreateUpdate] = React.useState(false);
  const [isOpenDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [dialogData, setDialogData] = React.useState<Prisma.MajorGetPayload<object> | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchMajors();
  }, [fetchMajors]);
  
  const handleOpenDialogCreateUpdate = (data: Prisma.MajorGetPayload<object> | null) => {
    setDialogData(data);
    setOpenDialogCreateUpdate(true);
  };

  const handleOpenDialogDelete = (id: string) => {
    setDeleteId(id);
    setOpenDialogDelete(true);
  };


  return (
    <SidebarInset>
      <SiteHeader title='Major' />
       <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <DialogCreateUpdate open={isOpenDialogCreateUpdate} onOpenChange={setOpenDialogCreateUpdate} initialData={dialogData} type='Major' >
                      <MajorForm onClose={() => setOpenDialogCreateUpdate(false)} initialData={dialogData}/>
                  </DialogCreateUpdate>
                  <DialogDelete open={isOpenDialogDelete} onOpenChange={setOpenDialogDelete} onDelete={() => deleteId !== null && deleteMajor(deleteId)}/>
                 <DataTable data={majors} columns={majorColumns(handleOpenDialogCreateUpdate, handleOpenDialogDelete)} title='Major' onOpenDialog={handleOpenDialogCreateUpdate}  />
                </div>
              </div>
            </div>
    </SidebarInset>
  )
}

export default Page;