import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/account/RegisterForm";

export const metadata: Metadata = { title: "Create an Account" };

export default function RegisterPage() {
  return (
    <main className="max-w-lg mx-auto px-5 py-20 md:py-28">
      <p className="text-[0.78rem] uppercase tracking-[0.14em] font-bold text-accent-3 mb-3.5">Get Started</p>
      <h1 className="font-serif text-3xl font-semibold mb-3">Create your retailer account</h1>
      <p className="text-ink/60 mb-8">
        Fill this in once — your company and shipping details are saved, so every Pro Forma Invoice request after this
        one is a single confirm.
      </p>

      <RegisterForm />

      <p className="text-sm text-ink/60 mt-8">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-ink">
          Log in
        </Link>
      </p>
    </main>
  );
}
