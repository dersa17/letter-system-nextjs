import * as React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from 'next/image';
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
import { userCreateSchema, userUpdateSchema } from "@/lib/schema.zod";
import { Prisma } from "@prisma/client";
import useUserStore from "@/app/stores/user-store"
import useMajorStore from "@/app/stores/major-store";
import useRoleStore from '@/app/stores/role-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const UserForm = ({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData?: Prisma.UserGetPayload<{
    include: {
      role: true
      major: true
    }
  }> | null;
}) => {
  const { addUser, updateUser } = useUserStore();
  const { majors, fetchMajors } = useMajorStore();
  const { roles, fetchRoles } = useRoleStore()
  React.useEffect(() => {
    fetchMajors();
    fetchRoles()
  }, [fetchMajors, fetchRoles]);

  const schema = initialData ? userUpdateSchema : userCreateSchema
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: initialData?.id || "",
      nama: initialData?.nama || "",
      email: initialData?.email || "",
      password: "",
      alamat: initialData?.alamat || "",
      periode: initialData?.periode || "",
      status: initialData?.status || undefined,
      image: undefined,
      idRole: initialData?.idRole || undefined,
      idMajor: initialData?.idMajor || undefined,
    },
  })
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);



  async function onSubmit(values: z.infer<typeof schema>) {
    const formData = new FormData()

    formData.append("id", values.id);
    formData.append("nama", values.nama);
    formData.append("email", values.email);

    if (values.password) formData.append("password", values.password);
    formData.append("alamat", values.alamat);
    formData.append("periode", values.periode);
    if (values.status) formData.append("status", values.status);
    if (values.image) formData.append("image", values.image)
    formData.append("idRole", String(values.idRole));
    if (values.idMajor) formData.append("idMajor", values.idMajor);



    if (initialData) {
      await updateUser(values.id, formData);
    } else {
      await addUser(formData);
    }
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 ">
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
                <Input placeholder="shadcn" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="shadcn" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} autoComplete="off" />
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
                <Input placeholder="shadcn" {...field} autoComplete="off" />
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
                <Input placeholder="shadcn" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Aktif"}>
                      {"Aktif"}
                    </SelectItem>
                    <SelectItem value={"Tidak Aktif"}>
                      {"Tidak Aktif"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="idRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ? String(field.value) : ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role " />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

 <div className="col-span-2 flex gap-4 items-start">
  {/* Kolom Kiri: Image Upload + Preview */}
  <div className="w-auto">
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
        <FormControl>
  <div className='flex flex-col items-center'>
    <Input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          field.onChange(file);
          setImagePreview(URL.createObjectURL(file));
        }
      }}
    />
    {imagePreview && (
   <Image
  src={imagePreview}
  alt="Preview"
  width={200}
  height={160}
  className="mt-2 max-h-40 rounded border object-cover"
/>
    )}
  </div>
</FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  </div>

  {/* Kolom Kanan: Major */}
  <div className="flex-1">
    <FormField
      control={form.control}
      name="idMajor"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Major</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
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
  </div>
</div>



        <Button type="submit">{initialData ? "Update" : "Add"}</Button>
      </form>
    </Form>
  );
}

export default UserForm