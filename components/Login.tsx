"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import userAuth from "@/myStore/userAuth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = userAuth();

  const userService = process.env.NEXT_PUBLIC_USER_SERVICE_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${userService}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { role } = response.data.user;
        loginUser(response.data.user);
        toast.success(response.data.message);

        switch (role) {
          case "Admin":
            router.replace("/Admin");
            break;
          case "Translator":
            router.replace("/Translator");
            break;
          case "Supervisor":
            router.replace("/Supervisor");
            break;
          case "Voice-over Artist":
            router.replace("/Voice-over-Artist");
            break;
          case "Sound Engineer":
            router.replace("/Sound-Engineer");
            break;
          case "Editor":
            router.replace("/Editor");
            break;
          default:
            toast.error("You are not authorized. Contact ICT Team.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
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
          <img src="/astan_Logo.png" alt="Astaan Logo" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Mr./Ms., please login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your email"
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2z" />
                <path d="M4 15h16v6H4z" />
              </svg>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="text-right text-sm">
            <Link
              href="/forgetpassword"
              className="text-gray-600 hover:text-orange-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-medium ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
