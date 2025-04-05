"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const userService = process.env.NEXT_PUBLIC_USER_SERVICE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.success("valid email address is required");
      return;
    }

    setSending(true);

    try {
      const response = await axios.post(
        `${userService}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setEmail("");
        toast.success(response.data.message);
        setEmail("");
        return;
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const message = error.response?.data?.error || "Server error";
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center px-4"
      style={{
        backgroundImage: `url('http://abdirhman.com/wp-content/uploads/2025/03/astaan-.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Astaan Logo" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot your password?
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                <path d="M12 14v6m0 0H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2h-6z" />
              </svg>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className={`w-full py-3 rounded-md text-white font-medium ${
              sending
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } transition`}
          >
            {sending ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-orange-500"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
