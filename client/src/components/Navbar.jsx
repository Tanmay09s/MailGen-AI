import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeftOnRectangleIcon,
  SparklesIcon,
  HomeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isHistory = location.pathname === "/history";

  const pageTitle = isDashboard
    ? "Dashboard"
    : isHistory
    ? "History"
    : "MailGen AI";

  const pageDescription = isDashboard
    ? "Generate your next AI-powered outreach campaign."
    : isHistory
    ? "View and manage your previous AI-generated campaigns."
    : "Welcome to MailGen AI.";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-[#020617]/80 px-8 backdrop-blur-2xl">

      {/* Left */}

      <div>

        {/* Desktop */}

        <div className="hidden md:block">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40">

              {isDashboard ? (
                <HomeIcon className="h-5 w-5 text-white" />
              ) : (
                <ClockIcon className="h-5 w-5 text-white" />
              )}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                {pageTitle}
              </h2>

              <p className="text-sm text-gray-400">
                {pageDescription}
              </p>

            </div>

          </div>

        </div>

        {/* Mobile */}

        <div className="flex items-center gap-3 md:hidden">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40">
            ✨
          </div>

          <span className="text-xl font-black bg-gradient-to-r from-white via-indigo-300 to-violet-400 bg-clip-text text-transparent">
            MailGen AI
          </span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 md:flex">

          <SparklesIcon className="h-5 w-5 text-green-400" />

          <span className="text-sm font-medium text-green-300">
            Welcome, {user?.name || "User"}
          </span>

        </div>

        <button
          onClick={logout}
          className="group flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition-all duration-300 hover:scale-105 hover:border-red-500/40 hover:bg-red-500 hover:text-white"
        >

          <ArrowLeftOnRectangleIcon className="h-5 w-5 transition group-hover:-translate-x-1" />

          Logout

        </button>

      </div>

    </header>
  );
};

export default Navbar;