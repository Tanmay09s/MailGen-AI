import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712] text-white">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <Navbar />

        <main className="relative flex-1 overflow-y-auto overflow-x-hidden">

          {/* Background Effects */}

          <div className="absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[150px]" />

            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[150px]" />

            <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

          </div>

          {/* Page */}

          <div className="relative z-10 min-h-full p-6 lg:p-8">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default Layout;