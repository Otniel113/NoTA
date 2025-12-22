"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/layout/AuthNavbar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <AuthNavbar type="register" />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg relative">
          <div className="relative bg-sand-light p-8 md:p-12 rounded-3xl shadow-soft">
            <header className="text-center mb-10">
              <h1 className="font-display text-4xl text-gray-800 mb-3">
                Create Account
              </h1>
              <p className="text-gray-600 text-lg font-light">
                Join the community to share your notes.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Username"
                icon="person"
                placeholder="Choose a unique username"
                required
                type="text"
              />
              <Input
                label="Email Address"
                icon="mail"
                placeholder="you@example.com"
                required
                type="email"
              />
              <Input
                label="Password"
                icon="lock"
                placeholder="Create a strong password"
                required
                type="password"
              />
              <Input
                label="Confirm Password"
                icon="lock_clock"
                placeholder="Repeat your password"
                required
                type="password"
              />

              <Button type="submit" fullWidth>
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
