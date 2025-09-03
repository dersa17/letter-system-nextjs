"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

const onSubmit = (data: z.infer<typeof suratKeteranganLulusSchema>) => {
    console.log("Graduation Certificate Data:", data);
    addLetter({type: "Keterangan Lulus", payload: data})
    form.reset()
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
              
              <Button type="submit" className="w-full">Submit Graduation Certificate</Button>
            </form>
          </Form>
  )
}

export default GraduationCertificateForm