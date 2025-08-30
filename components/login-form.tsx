"use client";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation"; ;
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form is being submitted");

  const res = await signIn("credentials", {
    redirect: false,
    id,
    password,
  });

  console.log("signIn response:", res);  // Tambahkan log untuk respons

  if (res?.error) {
    console.error("Error:", res.error);
    setError(res.error);  // Menampilkan pesan error jika ada
  } else if (res?.ok) {
   const session = await getSession();

    console.log("testing: ", session?.user?.role.id)

    if (session?.user?.role.id === 1) {
      router.push("/admin/dashboard");
    } else if (session?.user?.role.id === 2) {
      router.push("/mo/dashboard");
    } else if (session?.user?.role.id === 3) {
      router.push("/kaprodi/dashboard");
    } else if (session?.user?.role.id === 4) {
      router.push("/mahasiswa/home");
    } else {
      router.push("/login");
    }
  } else if (res?.error) {
    console.log("login gagal: ", res.error )
  }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your ID below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            placeholder="2372049"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
