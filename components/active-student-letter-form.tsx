"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import {suratMahasiswaAktifSchema} from "@/lib/schema.zod"
import useProfileStore from "@/app/stores/profile-store";
import { zodResolver } from "@hookform/resolvers/zod";
import useLetterStore from "@/app/stores/letter-store";
import ButtonSubmitLetter from "./button-submit-letter";

const ActiveStudentLetterForm = () => {
  const {profile, fetchProfile} = useProfileStore()
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const{addLetter} = useLetterStore()
  React.useEffect(() => {
    fetchProfile()
  }, [fetchProfile])
      
  const form = useForm<z.infer<typeof suratMahasiswaAktifSchema>>({
    resolver: zodResolver(suratMahasiswaAktifSchema),
    defaultValues: {
          namaLengkap: profile?.nama || "",
          alamat: profile?.alamat || "",
          periode: "",
          nrp: profile?.id || "",
          keperluanPengajuan: "",
    }

  });




const onSubmit = async (data: z.infer<typeof suratMahasiswaAktifSchema>) => {
    setIsSubmitting(true)
    console.log("Active Student Letter Data:", data);
    await addLetter({type: "Mahasiswa Aktif", payload: data})
    form.reset()
    setIsSubmitting(false)
  };

  return (
              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="periode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the period (e.g., 2024/2025)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="keperluanPengajuan"
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

                <ButtonSubmitLetter type="submit" isLoading={isSubmitting}>
                           Submit Active Student Letter
                      </ButtonSubmitLetter>
              
            </form>
          </Form>
  )
}

export default ActiveStudentLetterForm