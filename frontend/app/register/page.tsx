"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/layout/AuthNavbar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      // Redirect is handled in register function
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
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

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Username"
                icon="person"
                placeholder="Choose a unique username"
                required
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                label="Email Address"
                icon="mail"
                placeholder="you@example.com"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                icon="lock"
                placeholder="Create a strong password"
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Confirm Password"
                icon="lock_clock"
                placeholder="Repeat your password"
                required
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
