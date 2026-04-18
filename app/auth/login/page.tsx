"use client";

import LoginForm from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block relative w-1/2">
        <img
          src="https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b4?w=900&auto=format&fit=crop"
          alt="Lalibela Ethiopia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/60">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-white/80 max-w-xs">
            Ethiopia — the birthplace of coffee, home of ancient civilizations,
            and one of Africa&apos;s most captivating destinations.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-6">
            E
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">Sign In</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Continue your Ethiopian adventure
          </p>
          <GoogleButton />
          <div className="flex items-center gap-3 my-5">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>
          <LoginForm />
          <p className="text-sm text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
