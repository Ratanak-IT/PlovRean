"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff, Chrome, Sun, Moon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [theme, setTheme] = useState("light");

  // theme toggle switch
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully 🎉 Redirecting to login...");
      setLoading(false);
      router.push("/login");
    } catch (_err) {
      console.error(_err);
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: process.env.NEXT_PUBLIC_APP_URL },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (_err) {
      console.error(_err);
      setError("Google registration failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors">
      <Toaster position="top-right" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white shadow"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-xl p-6 w-full max-w-sm transition-colors">
        <h2 className="text-xl font-bold mb-1">Register</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
          Create a new account to continue
        </p>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm border border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900 p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-gray-700 text-white rounded-md p-2 hover:bg-gray-900 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Google */}
        <div className="mt-4">
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Chrome size={18} />
            Continue with Google
          </button>
        </div>

        {/* Already have an account? */}
        <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

