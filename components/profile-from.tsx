"use client"
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Edit2, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useProfileStore from "@/app/stores/profile-store";
import { profileUpdateSchema } from "@/lib/schemas";
import { z } from "zod";

const ProfileForm = () => {
  const { profile, fetchProfile, updateProfile, isLoading } = useProfileStore();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Fetch profile on mount
  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Form setup
  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      nama: profile?.nama || "",
      password: "",
      confirmPassword: "",
      alamat: profile?.alamat || "",
      image: profile?.image || undefined,
    },
  });



  React.useEffect(() => {
    if (profile) {
      form.reset({
        nama: profile.nama,
        password: "",
        confirmPassword: "",
        alamat: profile.alamat,
        image: undefined,
      });
      setImagePreview(profile.image || null);
    }
  }, [profile, form]);


  // Submit handler
  async function onSubmit(values: z.infer<typeof profileUpdateSchema>) {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("alamat", values.alamat);
    if (values.password) formData.append("password", values.password);
    if (values.image) formData.append("image", values.image);

    await updateProfile(formData);
  }

  // Handle image click
  function handleImageClick() {
    fileInputRef.current?.click();
  }

  // if (!profile) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-pulse text-muted-foreground">Memuat profil...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/30 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
                encType="multipart/form-data"
              >
                {/* Foto Profil */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 cursor-pointer group">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Foto Profil"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                          <User size={32} />
                        </div>
                      )}

                    </div>

                    {/* Icon pensil */}
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      title="Ganti foto profil"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Input file hidden */}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...form.register("image")}
                      ref={(e) => {
                        form.register("image").ref(e);
                        fileInputRef.current = e;
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("image", file, { shouldValidate: true });
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Form Grid - Lebar dan Responsif */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Kolom Kiri */}
                  <div className="space-y-6">
                    {/* Readonly Fields */}
                    <div>
                      <label className="text-sm font-medium text-foreground/80">User ID</label>
                      <Input
                        value={profile?.id || ""}
                        readOnly
                        className="bg-muted/50 border-muted-foreground/20 mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground/80">Email</label>
                      <Input
                        value={profile?.email || ""}
                        readOnly
                        className="bg-muted/50 border-muted-foreground/20 mt-2"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama lengkap"
                              {...field}
                              autoComplete="off"
                              className="border-border/50 focus:border-primary transition-colors"
                            />
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
                          <FormLabel className="text-sm font-medium">Alamat</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan alamat lengkap"
                              {...field}
                              autoComplete="off"
                              className="border-border/50 focus:border-primary transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                      <h3 className="text-lg font-medium mb-4 text-foreground/90">
                        Ganti Password
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Kosongkan jika tidak ingin mengubah password
                      </p>

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-sm font-medium">Password Baru</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Masukkan password baru"
                                {...field}
                                autoComplete="new-password"
                                className="border-border/50 focus:border-primary transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Konfirmasi Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Konfirmasi password baru"
                                {...field}
                                autoComplete="new-password"
                                className="border-border/50 focus:border-primary transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full max-w-md bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? "Menyimpan..." : "Update Profil"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileForm;
