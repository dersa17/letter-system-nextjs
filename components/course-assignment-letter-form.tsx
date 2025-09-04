"use client"
import React from "react";
import { useForm } from "react-hook-form";
import ButtonSubmitLetter from "./button-submit-letter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { suratTugasMkSchema } from "@/lib/schema.zod"
import useCourseStore from "@/app/stores/course-store";
import { zodResolver } from "@hookform/resolvers/zod";
import useLetterStore from "@/app/stores/letter-store";

const CourseAssignmentLetterForm = () => {
  
  const { courses, fetchCourses } = useCourseStore()
  const {addLetter} = useLetterStore()
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  React.useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  
  const form = useForm<z.infer<typeof suratTugasMkSchema>>({
    resolver: zodResolver(suratTugasMkSchema),
    defaultValues: {
      tujuanInstansi: "",    // Textarea
      periode: "",           // Input
      dataMahasiswa: "",     // Textarea
      tujuan: "",            // Textarea
      topik: "",             // Input
      idCourse: "",          // Select

    }

  });

  const onSubmit = async (data: z.infer<typeof suratTugasMkSchema>) => {
    setIsSubmitting(true)
    console.log("Course Assignment Letter Data:", data);
    await addLetter({type:"Tugas Mata Kuliah", payload: data})
    form.reset()
    setIsSubmitting(false)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="tujuanInstansi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Institution</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the purpose of the institution" {...field} />
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
          name="dataMahasiswa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Data</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter student information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tujuan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the objective" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Enter the topic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idCourse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmitLetter type="submit" isLoading={isSubmitting}>
              Submit Course Assignment Letter
        </ButtonSubmitLetter>


      </form>
    </Form>
  )
}

export default CourseAssignmentLetterForm