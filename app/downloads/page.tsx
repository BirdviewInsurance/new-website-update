"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

type DownloadItem = {
    id: string;
    title: string;
    category: "Brochure" | "Claim Form" | "Policy" | "Report" | "Guide";
    description?: string;
    size: string;
    fileType: string;
    date: string;
    href: string;
};

const SAMPLE_DOWNLOADS: DownloadItem[] = [
    {
        id: "d-1",
        title: "Individual Life Insurance Brochure",
        category: "Brochure",
        description: "Overview of individual life plans and benefits.",
        size: "2.4 MB",
        fileType: "pdf",
        date: "2025-06-12",
        href: "#",
    },
    {
        id: "d-2",
        title: "Motor Claim Form (Editable)",
        category: "Claim Form",
        description: "Fillable motor claim form for quick claims submission.",
        size: "120 KB",
        fileType: "pdf",
        date: "2025-03-05",
        href: "#",
    },
    {
        id: "d-3",
        title: "Group Health Policy Document",
        category: "Policy",
        description: "Full policy wording for corporate group health.",
        size: "4.8 MB",
        fileType: "pdf",
        date: "2025-01-02",
        href: "#",
    },
    {
        id: "d-4",
        title: "Annual Report 2024",
        category: "Report",
        description: "Financial highlights and business review for 2024.",
        size: "6.2 MB",
        fileType: "pdf",
        date: "2025-04-20",
        href: "#",
    },
    {
        id: "d-5",
        title: "Claims Guidance: Step-by-step",
        category: "Guide",
        description: "How to lodge a claim and what to expect.",
        size: "850 KB",
        fileType: "pdf",
        date: "2024-11-11",
        href: "#",
    },
];

export default function DownloadsPage() {
    const brandName = "Birdview Insurance";

    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<"All" | DownloadItem["category"]>("All");
    const [sortBy, setSortBy] = useState<"Newest" | "Name">("Newest");

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(SAMPLE_DOWNLOADS.map((d) => d.category)));
        return ["All", ...uniqueCategories];
    }, []);

    const filtered = useMemo(() => {
        let arr = SAMPLE_DOWNLOADS.filter(
            (d) =>
                (filter === "All" || d.category === filter) &&
                (d.title.toLowerCase().includes(query.toLowerCase()) ||
                    d.description?.toLowerCase().includes(query.toLowerCase()))
        );

        if (sortBy === "Newest") {
            arr = arr.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        } else {
            arr = arr.sort((a, b) => a.title.localeCompare(b.title));
        }

        return arr;
    }, [query, filter, sortBy]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6 md:p-12">
            <style>{`
        :root {
          --brand-primary: var(--color-primary, #0ea5e9);
          --brand-danger: var(--color-danger, #ef4444);
        }
      `}</style>

            <header className="max-w-6xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--brand-primary), var(--brand-danger))",
                            }}
                        >
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12h12M12 6v12"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-900">
                                {brandName} Downloads
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Access official brochures, forms, and policy documents.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-[380px]">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search documents..."
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                            />
                            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setFilter(c as any)}
                                className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-150 ${filter === c
                                    ? "bg-[var(--brand-primary)] text-white shadow"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Sort by</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                        >
                            <option>Newest</option>
                            <option>Name</option>
                        </select>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((item) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4 }}
                                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center rounded-lg text-white shadow-inner"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, var(--brand-primary), var(--brand-danger))",
                                            }}
                                        >
                                            <svg
                                                width="26"
                                                height="26"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7 3h7l4 4v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                                                    stroke="white"
                                                    strokeWidth="1.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M11 3v6h6"
                                                    stroke="white"
                                                    strokeWidth="1.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center flex-wrap gap-2 text-xs text-gray-500 mt-3">
                                                <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                                                    {item.category}
                                                </span>
                                                <span>{item.size}</span>
                                                <span>•</span>
                                                <span>
                                                    {new Date(item.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between gap-2">
                                    <motion.a
                                        href={item.href}
                                        download
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border border-white bg-red-600 text-white shadow-sm hover:bg-red-500 transition-all"
                                    >
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                            initial={{ y: 0 }}
                                            whileHover={{ y: 2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5 5m0 0 5-5m-5 5V4"
                                            />
                                        </motion.svg>
                                        Download
                                    </motion.a>

                                    <div className="flex gap-2">
                                        <button
                                            className="px-3 py-1.5 rounded-md text-xs font-medium border border-[var(--brand-danger)] text-[var(--brand-danger)] hover:bg-[var(--brand-danger)] hover:text-white transition-all"
                                        >
                                            Preview
                                        </button>
                                        <button
                                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--brand-primary)] text-white hover:opacity-90 transition-all"
                                        >
                                            Request
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="mt-10 text-center bg-white p-10 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-semibold text-gray-800">
                                No documents found
                            </h4>
                            <p className="text-sm text-gray-500 mt-2">
                                Try different filters or search terms.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
