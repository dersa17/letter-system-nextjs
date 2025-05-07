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
import { majorSchema } from "@/lib/schemas";
import { Prisma } from "@prisma/client";
import useMajorStore  from "@/app/stores/major-store";
const MajorForm = ({
  onClose,
  initialData,
}: {
  onClose: () => void
  initialData?: Prisma.MajorGetPayload<object> | null;
}) => {



  const {addMajor, updateMajor} = useMajorStore()

  const form = useForm<z.infer<typeof majorSchema>>({
    resolver: zodResolver(majorSchema),
    defaultValues: {
      id: initialData?.id || "", 
      nama: initialData?.nama || "",
    },
  });

  async function onSubmit(values: z.infer<typeof majorSchema>) {
    if (initialData) {
      await updateMajor(values.id, values);
    } else {
      await addMajor(values);
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
                <Input placeholder="shadcn" {...field} autoComplete="off" readOnly={!!initialData}  />
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
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} autoComplete="off"  />
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
export default MajorForm