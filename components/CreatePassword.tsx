"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

     if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setPasswordError("");

     alert("Password has been reset successfully.");
    router.push("/");
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full"
      style={{
        backgroundImage:
          "url('http://abdirhman.com/wp-content/uploads/2025/03/astaan-.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fadeIn">
        <div className="flex justify-center mb-6">
          <img
            src="http://abdirhman.com/wp-content/uploads/2025/03/logo.png"
            alt="Astaan Logo"
            className="h-16 object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create New Password
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Make sure your new password is strong and secure.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="relative">
            <label htmlFor="newPassword" className="sr-only">
              New Password
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Error Message */}
          {passwordError && (
            <p className="text-sm text-red-500 text-center -mt-2">{passwordError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition duration-300"
          >
            Reset Password
          </button>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-orange-500 transition"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Lock Icon Component
const LockIcon = () => (
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
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);
