"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // auto-fill functions (คงเดิม)
  const fillUser = () => {
    setEmail("sirawitchwill@gmail.com");
    setPassword("@S1wi+cHwill");
  };

  const fillAdmin = () => {
    setEmail("admin@book.com");
    setPassword("@Dm1Nbooking");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <Link href="/" className="inline-block">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl">
                <Calendar className="w-20 h-20 text-white" />
              </div>
            </div>
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to ExpoBook
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your premier platform for convenient exhibition booth booking, event
            management, and venue selection worldwide.
          </p>
          <div className="flex justify-center lg:justify-start space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-red-400">Welcome back to the platform</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="keepSignedIn"
                className="ml-2 text-sm text-gray-700"
              >
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-4 rounded-full text-lg font-medium transition-all transform shadow-lg ${
                isLoading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 hover:scale-105"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={fillUser}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm"
              >
                Autofill User
              </button>
              <button
                type="button"
                onClick={fillAdmin}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm"
              >
                Autofill Admin
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              href="/user/signup"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
