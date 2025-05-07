  import * as React from 'react'
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { z } from "zod";
  import { Input } from "./ui/input";
  import { Button } from "./ui/button";
  import { courseSchema } from "@/lib/schemas";
  import { Prisma } from "@prisma/client";
  import useCourseStore from "@/app/stores/course-store";
  import useMajorStore from "@/app/stores/major-store";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
const CourseForm = ({
    onClose,
    initialData,
  }: {
    onClose: () => void;
    initialData?: Prisma.CourseGetPayload<{include: {
      major: true
    }}> | null;
  }) => {
    const { addCourse, updateCourse } = useCourseStore();
    const { majors, fetchMajors} = useMajorStore();

      React.useEffect(() => {
        fetchMajors();
      }, [fetchMajors]);


    const form = useForm<z.infer<typeof courseSchema>>({
      resolver: zodResolver(courseSchema),
      defaultValues: {
        id: initialData?.id || "",
        nama: initialData?.nama || "",
        sks: initialData?.sks || 0,
        idMajor: initialData?.idMajor || "", 
      },
    });

    async function onSubmit(values: z.infer<typeof courseSchema>) {
      if (initialData) {
        await updateCourse(values.id, values);
      } else {
        await addCourse(values);
      }
      onClose();
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    autoComplete="off"
                    readOnly={!!initialData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} autoComplete="off"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKS</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="shadcn" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idMajor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Major" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                      <SelectItem key={major.id} value={major.id}>
                          {major.nama}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{initialData ? "Update" : "Add"}</Button>
        </form>
      </Form>
    );
  }

  export default CourseForm
