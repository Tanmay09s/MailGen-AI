import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  BoltIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const { user } = useAuth();

  const features = [
    {
      name: "Lightning Fast Generation",
      description:
        "Generate highly personalized cold emails within seconds using advanced AI models.",
      icon: BoltIcon,
    },
    {
      name: "Omnichannel Outreach",
      description:
        "Create Email, Follow-up, and LinkedIn messages in one seamless workflow.",
      icon: DocumentTextIcon,
    },
    {
      name: "Higher Conversion",
      description:
        "Professionally crafted copy designed to improve replies and conversions.",
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40">
                ✨
              </div>

              <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-white via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                MailGen AI
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold shadow-xl transition duration-300 hover:scale-105 hover:shadow-indigo-500/40"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold shadow-lg transition duration-300 hover:scale-105 hover:shadow-indigo-500/50"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-32">
        <div className="w-full text-center px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300 backdrop-blur-xl">
            🚀 AI Powered Outreach Platform
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
            Write Cold Emails
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              That Actually Get Replies
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Generate personalized outreach emails, follow-ups and LinkedIn
            messages in seconds. Save hours while increasing your response rate
            with AI-powered copywriting.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-base font-semibold shadow-2xl transition duration-300 hover:scale-105 hover:shadow-indigo-500/40"
            >
              Start For Free
              <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium backdrop-blur-lg transition hover:bg-white/10">
              Watch Demo
            </button>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {" "}
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/20"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mb-4 text-xl font-bold">{feature.name}</h3>

                <p className="leading-7 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="relative py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="rounded-full bg-indigo-500/10 px-5 py-2 text-sm font-semibold text-indigo-300">
              WHY MAILGEN AI
            </span>

            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                To Close More Deals
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Designed for recruiters, founders, freelancers and sales teams
              looking to scale personalized outreach without sacrificing
              quality.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl">
              <div className="mb-6 text-5xl">⚡</div>

              <h3 className="text-2xl font-bold">AI Powered Writing</h3>

              <p className="mt-4 leading-8 text-gray-400">
                Advanced AI understands your prospect and generates natural,
                persuasive emails that feel handcrafted.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl">
              <div className="mb-6 text-5xl">🎯</div>

              <h3 className="text-2xl font-bold">Personalized Outreach</h3>

              <p className="mt-4 leading-8 text-gray-400">
                Every message is tailored to your prospect's company,
                achievements and role for maximum engagement.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl">
              <div className="mb-6 text-5xl">📈</div>

              <h3 className="text-2xl font-bold">Better Response Rates</h3>

              <p className="mt-4 leading-8 text-gray-400">
                High-quality personalization leads to improved open rates,
                clicks and replies compared to generic cold emails.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-14 text-center shadow-2xl">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready To Scale Your Outreach?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
            Join thousands of professionals generating personalized cold emails
            in seconds with MailGen AI.
          </p>

          <div className="mt-10">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-gray-900 transition duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>{" "}
      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020617]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600">
                ✨
              </div>

              <span className="text-2xl font-black bg-gradient-to-r from-white via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                MailGen AI
              </span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              AI-powered cold email generation platform that helps sales teams,
              recruiters, founders and freelancers create personalized outreach
              at scale.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div>
              <h4 className="mb-4 font-semibold text-white">Product</h4>

              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/" className="transition hover:text-white">
                    Features
                  </Link>
                </li>

                <li>
                  <Link to="/" className="transition hover:text-white">
                    Pricing
                  </Link>
                </li>

                <li>
                  <Link to="/" className="transition hover:text-white">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Company</h4>

              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/" className="transition hover:text-white">
                    About
                  </Link>
                </li>

                <li>
                  <Link to="/" className="transition hover:text-white">
                    Contact
                  </Link>
                </li>

                <li>
                  <Link to="/" className="transition hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">
            <p>© {new Date().getFullYear()} MailGen AI. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link to="/" className="transition hover:text-white">
                Terms
              </Link>

              <Link to="/" className="transition hover:text-white">
                Privacy
              </Link>

              <Link to="/" className="transition hover:text-white">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
