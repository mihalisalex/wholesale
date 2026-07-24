import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/account/LoginForm";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto px-5 py-20 md:py-28">
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">Retailer Login</p>
      <h1 className="font-serif text-3xl font-semibold mb-8">Log in to your account</h1>

      <Suspense>
        <LoginForm />
      </Suspense>

      <p className="text-sm text-ink/60 mt-8">
        New retailer?{" "}
        <Link href="/register" className="underline hover:text-ink">
          Create an account
        </Link>
      </p>
    </main>
  );
}
