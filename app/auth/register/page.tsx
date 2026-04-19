"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useLang } from "@/lib/language-context";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block relative w-1/2">
        <Image
          src="/images/Simien Mountains, Ethiopia.jpg"
          alt="Simien Mountains Ethiopia"
          fill
          className="object-cover"
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/60">
          <h2 className="text-3xl font-bold mb-2">Welcome to EthioTour</h2>
          <p className="text-sm text-white/80 max-w-xs">{t.auth.startJourney}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-6">
            E
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">{t.auth.register}</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">{t.auth.startJourney}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{t.auth.name}</label>
              <Input placeholder={t.auth.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t.auth.email}</label>
              <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{t.auth.password}</label>
              <Input type="password" placeholder={t.auth.passwordPlaceholder} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? t.auth.creating : t.auth.register}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {t.auth.alreadyHave}{" "}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">{t.auth.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
