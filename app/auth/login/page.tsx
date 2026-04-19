"use client";

import LoginForm from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden md:block relative w-1/2">
        <img
          src="/images/Simien Mountains, Ethiopia.jpg"
          alt="Simien Mountains Ethiopia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/60">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-white/80 max-w-xs">Ethiopia — the birthplace of coffee, home of ancient civilizations, and one of Africa's most captivating destinations.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12 bg-background">
        <div className="w-full max-w-sm">
          <img src="/images/flag-ethiopia.jpg" alt="Ethiopian Flag" className="w-32 h-32 object-cover rounded-xl mx-auto mb-6" />
          <div className="eth-stripe rounded-full mb-6 w-16 h-1.5 mx-auto" />
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
