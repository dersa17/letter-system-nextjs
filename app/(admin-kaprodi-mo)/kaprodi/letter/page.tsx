"use client";
import React from "react";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/data-table";
import { FilterConfig } from "@/components/data-table-columns-filter";
import { SidebarInset } from "@/components/ui/sidebar";
import useLetterStore from "@/app/stores/letter-store";
import { kaprodiLetterColumns } from "@/components/columns";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
const Page = () => {
  const { letters, fetchLetters, updateStatusLetter } = useLetterStore();
  const [isOpenDialogApproveLetter, setOpenDialogApproveLetter] =
    React.useState(false);
  const [isOpenDialogRejectLetter, setOpenDialogRejectLetter] =
    React.useState(false);
  const [approveLeterId, setApproveLetterId] = React.useState<number>()
  const [rejectLeterId, setRejectLetterId] = React.useState<number>()

  const handleOpenDialogApproveLetter = (id: number) => {
    setApproveLetterId(id)
    setOpenDialogApproveLetter(true);
  };

  const handleOpenDialogRejectLetter = (id: number) => {
    setRejectLetterId(id)
    setOpenDialogRejectLetter(true);
  };



  const filterConfig: FilterConfig[] = [
    {
      type: "select",
      column: "status",
      title: "Status",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
        { label: "Finished", value: "Finished" },
      ],
    },
    {
      type: "select",
      column: "jenisSurat",
      title: "Letter Type",
      options: [
        { label: "Laporan Hasil Studi", value: "Laporan Hasil Studi" },
        { label: "Tugas Mata Kuliah", value: "Tugas Mata Kuliah" },
        { label: "Keterangan Lulus", value: "Keterangan Lulus" },
        { label: "Mahasiswa Aktif", value: "Mahasiswa Aktif" },
      ],
    },
    {
      type: "dateRange",
      column: "tanggalPengajuan",
      title: "Submission Date",
    },
  ];

  React.useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  return (
    <SidebarInset>
      <SiteHeader title="Letter" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable
              data={letters}
              columns={kaprodiLetterColumns(
                handleOpenDialogApproveLetter,
                handleOpenDialogRejectLetter
              )}
              title="Letter"
              filterConfig={filterConfig}
            />
            <AlertDialog open={isOpenDialogApproveLetter} onOpenChange={setOpenDialogApproveLetter}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently Approve
                    letter.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel autoFocus={false}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => approveLeterId && updateStatusLetter(approveLeterId, "Approved")} >
                    Approve
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={isOpenDialogRejectLetter} onOpenChange={setOpenDialogRejectLetter}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently Reject
                    letter.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel autoFocus={false}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => rejectLeterId && updateStatusLetter(rejectLeterId, "Rejected")} >
                    Reject
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
