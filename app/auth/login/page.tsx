"use client";

import LoginForm from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div
        className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-12"
        style={{ background: "linear-gradient(135deg, #DA121A, #8b0000)" }}
      >
        <div className="text-center">
          <div className="text-7xl mb-6">☕</div>
          <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
          <p className="text-red-100 text-sm leading-relaxed max-w-xs">
            Ethiopia — the birthplace of coffee, home of ancient civilizations,
            and one of Africa&apos;s most captivating destinations.
          </p>
          <div className="mt-8 flex gap-2 justify-center">
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-red-300" />
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12 bg-background">
        <div className="w-full max-w-sm">
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
