"use client";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        id,
        password,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      const session = await getSession();
      const roleRedirects: Record<number, string> = {
        1: "/admin/dashboard",
        2: "/mo/dashboard",
        3: "/kaprodi/dashboard",
        4: "/mahasiswa/home",
      };

      const redirectPath = session?.user?.role.id
        ? roleRedirects[session.user.role.id] || "/login"
        : "/login";

      router.push(redirectPath);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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
        <p className="text-muted-foreground text-sm">
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
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
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

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></span>
          )}
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
