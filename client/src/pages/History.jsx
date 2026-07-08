import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import {
  MagnifyingGlassIcon,
  ClipboardDocumentIcon,
  TrashIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const History = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = history.filter((item) => {
      const query = search.toLowerCase();

      return (
        item.subject?.toLowerCase().includes(query) ||
        item.prompt?.toLowerCase().includes(query)
      );
    });

    setFilteredHistory(filtered);
  }, [history, search]);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get("/ai/history");

      setHistory(data);
      setFilteredHistory(data);

      if (data.length > 0) {
        setSelected(data[0]);
      }
    } catch (err) {
      toast.error("Unable to load history");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {
    try {
      await api.delete(`/ai/history/${id}`);

      toast.success("Deleted successfully");

      const updated = history.filter((item) => item._id !== id);

      setHistory(updated);
      setFilteredHistory(updated);

      if (selected?._id === id) {
        setSelected(updated[0] || null);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);

    setCopied(type);

    toast.success("Copied!");

    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg font-medium text-slate-500">
          Loading History...
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT */}

      <div className="lg:col-span-4">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-md">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800">History</h2>

            <p className="mt-1 text-sm text-slate-500">
              View your previous campaigns
            </p>

            <div className="relative mt-5">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="max-h-[650px] overflow-y-auto">
            {filteredHistory.length === 0 ? (
              <div className="p-10 text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-slate-300" />

                <p className="mt-4 text-slate-500">No history found</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className={`cursor-pointer border-b border-slate-200 p-5 transition hover:bg-slate-50 ${
                    selected?._id === item._id ? "bg-indigo-50" : ""
                  }`}
                >
                  <h3 className="line-clamp-1 font-semibold text-slate-800">
                    {item.subject}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {item.prompt}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDaysIcon className="h-4 w-4" />

                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistory(item._id);
                      }}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="lg:col-span-8">
        {" "}
        {selected ? (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-md">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Campaign Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Created on {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-6 p-6">
              {/* Subject */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    📩 Subject Line
                  </h3>

                  <button
                    onClick={() => copyText(selected.subject, "subject")}
                    className="rounded-lg bg-white p-2 shadow hover:bg-slate-100"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-slate-700">
                  {selected.subject}
                </p>
              </div>

              {/* Cold Email */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    📧 Cold Email
                  </h3>

                  <button
                    onClick={() => copyText(selected.emailBody, "email")}
                    className="rounded-lg bg-white p-2 shadow hover:bg-slate-100"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-slate-700 leading-7">
                  {selected.emailBody}
                </p>
              </div>

              {/* LinkedIn */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    💼 LinkedIn DM
                  </h3>

                  <button
                    onClick={() => copyText(selected.linkedInDM, "linkedin")}
                    className="rounded-lg bg-white p-2 shadow hover:bg-slate-100"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-slate-700 leading-7">
                  {selected.linkedInDM}
                </p>
              </div>

              {/* Follow Up */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    🔁 Follow-up Email
                  </h3>

                  <button
                    onClick={() => copyText(selected.followUpEmail, "followup")}
                    className="rounded-lg bg-white p-2 shadow hover:bg-slate-100"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-slate-700 leading-7">
                  {selected.followUpEmail}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[650px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white">
            <div className="text-center">
              <DocumentTextIcon className="mx-auto h-16 w-16 text-slate-300" />

              <h2 className="mt-5 text-2xl font-bold text-slate-700">
                Select a Campaign
              </h2>

              <p className="mt-3 text-slate-500">
                Choose any campaign from the left to view its details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
