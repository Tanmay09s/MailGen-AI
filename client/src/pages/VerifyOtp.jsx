import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const userId = location.state?.userId;
  const email = location.state?.email;

  if (!userId) {
    navigate("/signup");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.post("/auth/verify-otp", {
        userId,
        otp,
      });

      login(data);

      toast.success("Email verified successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification failed"
      );
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

        <div className="absolute left-1/2 top-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      <div className="w-full max-w-md">

        <div className="mb-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/40">

            <ShieldCheckIcon className="h-8 w-8 text-white" />

          </div>

          <h1 className="mt-8 text-4xl font-black text-white">
            Verify Email
          </h1>

          <p className="mt-4 text-gray-400">
            Enter the verification code sent to
          </p>

          <p className="mt-2 break-all font-semibold text-indigo-300">
            {email}
          </p>

        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            <div>

              <label className="mb-4 block text-center text-sm font-medium text-gray-300">
                Enter 6-Digit OTP
              </label>

              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
                className="w-full rounded-2xl border border-white/10 bg-black/20 py-5 text-center font-mono text-3xl tracking-[0.7em] text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
              />

            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
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

                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <ArrowRightIcon className="h-5 w-5" />
                </>
              )}
            </button>

          </form>

          <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">

            <p className="text-sm text-indigo-200">
              Didn't receive the code?
            </p>

            <button
              type="button"
              className="mt-2 font-semibold text-indigo-300 transition hover:text-white"
            >
              Resend OTP
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VerifyOtp;