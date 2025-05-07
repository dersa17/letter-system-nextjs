"use client"
import React from 'react'
import { SiteHeader } from "@/components/site-header"
import { DataTable } from '@/components/data-table'
import DialogCreateUpdate from '@/components/dialog-create-update'
import useCourseStore from '@/app/stores/course-store'
import CourseForm  from '@/components/course-form'
import { Prisma } from '@prisma/client'
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import DialogDelete  from '@/components/dialog-delete'
import { courseColumns } from '@/components/columns'
const Page = () => {

  const { courses, fetchCourses, deleteCourse } = useCourseStore();
  const [isOpenDialogCreateUpdate, setOpenDialogCreateUpdate] = React.useState(false);
  const [isOpenDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [dialogData, setDialogData] = React.useState<Prisma.CourseGetPayload<{include: {
    major: true
  }}> | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | number | null>(null);

  React.useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  
  const handleOpenDialogCreateUpdate = (data: Prisma.CourseGetPayload<{include: {
    major: true
  }}> | null) => {
    setDialogData(data);
    setOpenDialogCreateUpdate(true);
  };

  const handleOpenDialogDelete = (id: string | number) => {
    setDeleteId(id);
    setOpenDialogDelete(true);
  };



  return (
    <SidebarInset>
      <SiteHeader title='Course' />
      <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <DialogCreateUpdate open={isOpenDialogCreateUpdate} onOpenChange={setOpenDialogCreateUpdate} initialData={dialogData} type='Course'>
                      <CourseForm onClose={() => setOpenDialogCreateUpdate(false)} initialData={dialogData} ></CourseForm>
                </DialogCreateUpdate>
                <DialogDelete open={isOpenDialogDelete} onOpenChange={setOpenDialogDelete} onDelete={() => deleteId !== null && deleteCourse(deleteId)}></DialogDelete>
                 <DataTable data={courses} title='Course' columns={courseColumns(handleOpenDialogCreateUpdate, handleOpenDialogDelete)} onOpenDialog={handleOpenDialogCreateUpdate}/>
                </div>
              </div>
            </div>
    </SidebarInset>
  )
}

export default Page;
