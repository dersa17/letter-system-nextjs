"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { laporanHasilStudiSchema } from "@/lib/schema.zod"
import useProfileStore from "@/app/stores/profile-store";
import useLetterStore from "@/app/stores/letter-store";
import { zodResolver } from "@hookform/resolvers/zod";


const StudyResultReportLetterForm = () => {
  const { profile, fetchProfile } = useProfileStore()
  const {addLetter} = useLetterStore()
  React.useEffect(() => {
    fetchProfile()
  }, [fetchProfile])


  const form = useForm<z.infer<typeof laporanHasilStudiSchema>>({
    resolver: zodResolver(laporanHasilStudiSchema),
    defaultValues: {
        namaLengkap: profile?.nama || "",
        nrp: profile?.id || "",
        keperluanPembuatan: "",
    }

  });

  const onSubmit = (data: z.infer<typeof laporanHasilStudiSchema>) => {
    console.log("Study Result report Letter Data:", data);
    addLetter({type: "Laporan Hasil Studi", payload: data})
    form.reset()
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => {
    console.log("form submit triggered");
    form.handleSubmit(onSubmit)(e);
  }} className="space-y-6">
        <FormField
          control={form.control}
          name="namaLengkap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nrp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter student ID number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keperluanPembuatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Submission</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the purpose of submission" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={()=> console.log("clicked")} type="submit" className="w-full">Submit Learning Outcome Report</Button>
      </form>
    </Form>
  )
}

export default StudyResultReportLetterForm