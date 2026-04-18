"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    setLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.ok) {
      setLoading(false);
      toast.error("Invalid email or password");
      return;
    }

    // Fetch role from API after sign in
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    toast.success("Welcome back! ");

    if (role === "ADMIN") {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = "/admin/analytics";
    } else {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="Email"
        type="email"
        {...form.register("email")}
      />
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm">{form.formState.errors.email.message as string}</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm">{form.formState.errors.password.message as string}</p>
      )}

      <Button className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
