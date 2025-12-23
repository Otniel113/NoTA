"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/layout/AuthNavbar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData);
      // Redirect is handled in login function
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <AuthNavbar type="login" />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-sand-light rounded-3xl p-8 md:p-10 shadow-soft relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sage-light rounded-full blur-2xl opacity-60 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sage-medium rounded-full blur-2xl opacity-60 pointer-events-none"></div>

            <div className="relative z-10">
              <header className="text-center mb-8">
                <h1 className="font-display text-4xl text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Sign in to access your notes</p>
              </header>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email or Username"
                  icon="person"
                  placeholder="Enter your username or email"
                  required
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">
                        lock
                      </span>
                    </div>
                    <input
                      className="block w-full pl-11 pr-4 py-3 rounded-xl border-none bg-background-light text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary/50 shadow-inner-light transition-all outline-none"
                      placeholder="••••••••"
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
