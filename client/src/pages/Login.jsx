import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      login(data);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6">

      {/* Background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      <div className="w-full max-w-md">

        <div className="mb-10 text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-xl shadow-lg shadow-indigo-500/40">
              ✨
            </div>

            <span className="text-3xl font-black bg-gradient-to-r from-white via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              MailGen AI
            </span>

          </Link>

          <h1 className="mt-8 text-4xl font-black text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-400">
            Sign in to continue generating AI-powered outreach.
          </p>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-3 block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <div className="relative">

                <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                />

              </div>

            </div>

            <div>

              <label className="mb-3 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">

                <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-20"
                    />
                    <path
                      d="M22 12a10 10 0 00-10-10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>

                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRightIcon className="h-5 w-5" />
                </>
              )}

            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-400">
              Don't have an account?
            </p>

            <Link
              to="/signup"
              className="mt-3 inline-block font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Create a free account →
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;