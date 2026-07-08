import React, { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  SparklesIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const { data } = await api.post("/ai/generate-email", {
        prompt,
      });

      setResult(data);
      toast.success("Successfully generated!");
    } catch (error) {
      toast.error("Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);

    toast.success("Copied to clipboard!");

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  const ResultCard = ({ title, content, type }) => (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

        <button
          onClick={() => copyToClipboard(content, type)}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          {copied === type ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="h-5 w-5 text-slate-500" />
          )}
        </button>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="whitespace-pre-wrap leading-7 text-slate-700">
          {content}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel */}

        <div className="lg:col-span-1">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl bg-indigo-100 p-3">
                <SparklesIcon className="h-6 w-6 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  New Campaign
                </h2>

                <p className="text-sm text-slate-500">Describe your prospect</p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Context / Prompt
                </label>

                <textarea
                  rows={14}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example:

Write a cold email to a marketing director at a SaaS company offering an AI tool that improves retention by 20%."
                  className="w-full resize-none rounded-2xl border border-slate-300 bg-white p-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                    Generating...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5" />
                    Generate Output
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel */}

        <div className="lg:col-span-2">
          {" "}
          {result ? (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    AI Results
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your generated outreach is ready. Click the copy icon to
                    copy any section.
                  </p>
                </div>

                <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  Ready ✓
                </div>
              </div>

              <ResultCard
                title="📩 Subject Line"
                content={result.subject}
                type="subject"
              />

              <ResultCard
                title="📧 Cold Email"
                content={result.emailBody}
                type="email"
              />

              <ResultCard
                title="💼 LinkedIn DM"
                content={result.linkedInDM}
                type="linkedin"
              />

              <ResultCard
                title="🔁 Follow-up Email"
                content={result.followUpEmail}
                type="followup"
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[700px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 shadow-md">
              <div className="mb-6 rounded-full bg-indigo-100 p-6">
                <ClipboardDocumentIcon className="h-12 w-12 text-indigo-600" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                Generate AI Outreach
              </h2>

              <p className="mt-4 max-w-lg text-center leading-7 text-slate-500">
                Fill in the prompt on the left and click
                <span className="font-semibold text-indigo-600">
                  {" "}
                  Generate Output{" "}
                </span>
                to receive a complete outreach campaign including:
              </p>

              <div className="mt-8 grid w-full max-w-xl gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-800">
                    📩 Subject Line
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Catchy AI-generated subject line.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-800">
                    📧 Cold Email
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Personalized cold email based on your prompt.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-800">
                    💼 LinkedIn DM
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Short and engaging LinkedIn outreach message.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-800">
                    🔁 Follow-up Email
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Professional follow-up email for better response rates.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
