"use client"
import React from "react";
import { useForm } from "react-hook-form";
import ButtonSubmitLetter from "./button-submit-letter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {suratKeteranganLulusSchema} from "@/lib/schema.zod"
import useProfileStore from "@/app/stores/profile-store";
import { zodResolver } from "@hookform/resolvers/zod";
import useLetterStore from "@/app/stores/letter-store";

const GraduationCertificateForm = () => {
  const {profile, fetchProfile} = useProfileStore()
  const {addLetter} = useLetterStore()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  React.useEffect(() => {
    fetchProfile()
  }, [fetchProfile])
      
  const form = useForm<z.infer<typeof suratKeteranganLulusSchema>>({
    resolver: zodResolver(suratKeteranganLulusSchema),
    defaultValues: {
        namaLengkap: profile?.nama || "",
        nrp: profile?.id || "",
        tanggalLulus: "",
    }

  });

const onSubmit = async (data: z.infer<typeof suratKeteranganLulusSchema>) => {
    setIsSubmitting(true)
    console.log("Graduation Certificate Data:", data);
    await addLetter({type: "Keterangan Lulus", payload: data})
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
                name="tanggalLulus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <ButtonSubmitLetter type="submit" isLoading={isSubmitting}>
                            Submit Graduation Certificate Letter
                </ButtonSubmitLetter>
              
            </form>
          </Form>
  )
}

export default GraduationCertificateForm