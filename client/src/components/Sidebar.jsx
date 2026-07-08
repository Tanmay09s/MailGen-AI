import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClockIcon,
  SparklesIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: ClockIcon,
      path: "/history",
    },
  ];

  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-[#020617]/80 backdrop-blur-2xl md:flex">

      {/* Logo */}

      <div className="flex h-20 items-center border-b border-white/10 px-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40">
            ✨
          </div>

          <div>

            <h1 className="bg-gradient-to-r from-white via-indigo-300 to-violet-400 bg-clip-text text-xl font-black text-transparent">
              MailGen AI
            </h1>

            <p className="text-xs text-gray-500">
              AI Outreach Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8">

        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Navigation
        </p>

        <div className="space-y-3">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon className="h-6 w-6" />

                <span>{item.name}</span>

              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* Bottom Card */}

      <div className="p-5">

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 p-6 backdrop-blur-xl">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600">

            <BoltIcon className="h-6 w-6 text-white" />

          </div>

          <h3 className="text-lg font-bold text-white">
            AI Assistant
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Generate outreach campaigns, manage your history, and access all your AI-generated emails from one place.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-indigo-300">

            <SparklesIcon className="h-5 w-5" />

            <span>Unlimited Campaigns</span>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;