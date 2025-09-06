"use client";
import React from "react";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/data-table";
import { FilterConfig } from "@/components/data-table-columns-filter";
import { SidebarInset } from "@/components/ui/sidebar";
import useLetterStore from "@/app/stores/letter-store";
import { moLetterColumns } from "@/components/columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { pengajuanSuratSchema } from "@/lib/schema.zod";
import { handleDownload } from "@/lib/download.letter";
const Page = () => {
  const { letters, fetchLetters, uploadLetter } = useLetterStore();
  const [isOpenDialogUploadLetter, setOpenDialogUploadLetter] =
    React.useState(false);
  const [uploadLeterId, setUploadLetterId] = React.useState<number>();
  const [isLoading, setLoading] = React.useState<boolean>(false)

  const handleOpenDialogUploadLetter = (id: number) => {
    setUploadLetterId(id);
    setOpenDialogUploadLetter(true);
  };

  const form = useForm<z.infer<typeof pengajuanSuratSchema>>({
    resolver: zodResolver(pengajuanSuratSchema),
    defaultValues: {
      fileSurat: undefined,
    },
  });

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

  const onSubmit = async (value: z.infer<typeof pengajuanSuratSchema>) => {
    setLoading(true)
    const formData = new FormData()

    formData.append("fileSurat", value.fileSurat)

    if (uploadLeterId) {
      await uploadLetter(uploadLeterId, formData)
    }
    setLoading(false)
    form.reset()
    setOpenDialogUploadLetter(false)

  }



  return (
    <SidebarInset>
      <SiteHeader title="Letter" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <Dialog
              open={isOpenDialogUploadLetter}
              onOpenChange={setOpenDialogUploadLetter}
            >
              <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                  <DialogTitle>Upload Letter</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="fileSurat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File Surat</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder="Pilih file surat"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              } // ambil file pertama
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormDescription>
                            Unggah file surat dalam format PDF
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                      {isLoading && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></span>
                      )}
                      {isLoading ? "Uploading..." : "Upload"}
                    </Button>

                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <DataTable
              data={letters}
              columns={moLetterColumns(handleOpenDialogUploadLetter, handleDownload)}
              title="Letter"
              filterConfig={filterConfig}
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
