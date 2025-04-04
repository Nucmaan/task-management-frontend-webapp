"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to send a reset password email
    alert("Password reset link sent to your email");
    router.push("/");
  };

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundImage:
          "url('http://abdirhman.com/wp-content/uploads/2025/03/astaan-.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="m-auto bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
        <img src="/logo.png" alt="Astaan Logo" width={120} height={40} />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Forgot your password?
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email and we'll send you a link to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition duration-300"
          >
            Send Reset Link
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
