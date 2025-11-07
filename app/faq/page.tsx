"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import jsPDF from "jspdf";
import { useInView } from "react-intersection-observer";

type Faq = {
    id: string;
    q: string;
    a: string;
    section: string;
};

const FAQS: Faq[] = [
    // General Company Info
    {
        id: "g-1",
        section: "General",
        q: "What is Birdview Insurance and what do you offer?",
        a: `Birdview Insurance is a full-service insurer specializing in life, health, motor, and corporate solutions. We combine fast claims processing, tailored underwriting, and local expertise to serve both individual and corporate clients.`,
    },
    {
        id: "g-2",
        section: "General",
        q: "Where are you located and how can I contact Birdview?",
        a: `Our head office is located in Nairobi, Kenya. You can contact us via the Contact page, email support@birdview.co.ke, or call +254 700 000 000. For immediate help use our 24/7 claims hotline.`,
    },

    // Policy & Coverage
    {
        id: "p-1",
        section: "Policy & Coverage",
        q: "How do I choose the right policy for me or my business?",
        a: `Start with a quick needs assessment available on our website or speak to one of our advisors. We evaluate risk exposure, budget, and desired benefits to recommend a tailored policy.`,
    },
    {
        id: "p-2",
        section: "Policy & Coverage",
        q: "Can I add dependants or change beneficiaries?",
        a: `Yes. Most personal policies allow you to add dependants or update beneficiaries. Changes may require documentation and could affect premiums — contact your agent for the exact process.`,
    },
    {
        id: "p-3",
        section: "Policy & Coverage",
        q: "Do you offer group/corporate insurance plans?",
        a: `Yes — we offer scalable group plans for SMEs and large corporations. Benefits commonly include group life, medical cover, and employee benefits packages with administrative support.`,
    },

    // Claims & Procedures
    {
        id: "c-1",
        section: "Claims & Procedures",
        q: "How do I lodge a claim?",
        a: `To lodge a claim: 1) Login to your customer portal or use our claims form; 2) Provide the required documents (policy number, ID, incident report, supporting invoices/photos); 3) Submit the claim. We will acknowledge within 24 hours and assign a claims officer.`,
    },
    {
        id: "c-2",
        section: "Claims & Procedures",
        q: "What documents are required for motor claims?",
        a: `Typically: police abstract (if required), claim form, driver's license copy, vehicle logbook, repair estimate, photos of the damage, and any third-party statements. Requirements vary by case; the claims officer will confirm.`,
    },
    {
        id: "c-3",
        section: "Claims & Procedures",
        q: "How long does a claim take to process?",
        a: `We aim to acknowledge claims within 24 hours. Simple, well-documented claims are typically settled within 7-14 business days. Complex claims or those requiring investigations may take longer. We'll keep you updated at every stage.`,
    },

    // Payments & Renewals
    {
        id: "m-1",
        section: "Payments & Renewals",
        q: "What payment methods do you accept?",
        a: `We accept bank transfers, card payments (Visa/Mastercard), M-Pesa (where available), and scheduled direct debits for corporate clients. Payment methods available will display on the checkout or invoice.`,
    },
    {
        id: "m-2",
        section: "Payments & Renewals",
        q: "How do I renew my policy?",
        a: `You can renew online via the customer portal, through your broker, or by contacting our support team. We send renewal reminders 30 and 7 days before expiry. Some policies support automatic renewal when payment details are stored.`,
    },
    {
        id: "m-3",
        section: "Payments & Renewals",
        q: "Can I change my payment frequency?",
        a: `Yes — subject to policy terms. We can switch monthly, quarterly, or annual premiums. Frequency changes may affect the total premium due to different fees or discounts.`,
    },

    // Customer Support & Contact
    {
        id: "s-1",
        section: "Support",
        q: "How do I reach customer support?",
        a: `Use our Contact page, email support@birdview.co.ke, call +254 700 000 000, or start a live chat from the website. For claims, use the dedicated claims hotline for faster handling.`,
    },
    {
        id: "s-2",
        section: "Support",
        q: "What are your support hours?",
        a: `General support: Monday–Friday, 08:00–17:00 EAT. Claims hotline: 24/7 for urgent incidents.`,
    },
    {
        id: "s-3",
        section: "Support",
        q: "How do I submit feedback or make a complaint?",
        a: `We value feedback. Use the feedback form on our Contact page or email complaints@birdview.co.ke. Our complaints team will acknowledge within 3 working days and provide a resolution timeline.`,
    },
];

export default function FAQPage() {
    const brandName = "Birdview Insurance";
    
    const [active, setActive] = useState<string | null>("g-1");
    const [query, setQuery] = useState("");
    const [section, setSection] = useState<string | "All">("All");
    const [showSidebar, setShowSidebar] = useState(false);

    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const sections = ["All", ...Array.from(new Set(FAQS.map((f) => f.section)))];

    useEffect(() => {
        const saved = sessionStorage.getItem("faqLastSection");
        if (saved) setSection(saved);

        // If page loads with a hash, open that question and scroll to it
        if (typeof window !== "undefined" && window.location.hash) {
            const hash = window.location.hash.substring(1);
            const match = FAQS.find((f) => f.id === hash);
            if (match) {
                setSection(match.section as any);
                setActive(hash);
                const el = document.getElementById(hash);
                if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
            }
        }
    }, []);

    useEffect(() => {
        if (section) sessionStorage.setItem("faqLastSection", section);
    }, [section]);

    useEffect(() => {
        if (inView) controls.start("visible");
    }, [controls, inView]);

    const visible = FAQS.filter((f) => {
        const matchesSection = section === "All" || f.section === section;
        const q = query.trim().toLowerCase();
        const matchesQuery = q === "" || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
        return matchesSection && matchesQuery;
    });

    // converts an image url to a dataURL for jsPDF
    const urlToDataUrl = async (url: string) => {
        const resp = await fetch(url);
        const blob = await resp.blob();
        return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleDownloadPDF = async () => {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const margin = 40;
        let y = margin;

        // try load logo
        let logoDataUrl: string | null = null;
        try {
            logoDataUrl = await urlToDataUrl("/images/logo1.png");
        } catch (e) {
            console.warn("Could not load logo for PDF", e);
        }

        // Header
        if (logoDataUrl) {
            doc.addImage(logoDataUrl, "PNG", margin, y, 60, 60);
        }
        doc.setFontSize(20);
        doc.setTextColor("#ffffff");
        doc.setFillColor("#0ea5e9");
        doc.rect(margin + (logoDataUrl ? 70 : 0), y, 450, 60, "F");
        doc.setTextColor("#ffffff");
        doc.text("Birdview Insurance - Frequently Asked Questions", margin + (logoDataUrl ? 80 : 10), y + 38);

        y += 90;

        doc.setFontSize(10);
        doc.setTextColor("#666");
        doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
        y += 20;

        for (let i = 0; i < visible.length; i++) {
            const f = visible[i];

            // Question block (primary)
            const qText = f.q;
            const qLines = doc.splitTextToSize(qText, 480);
            const qHeight = qLines.length * 16 + 12;
            doc.setFillColor("#0ea5e9");
            doc.setDrawColor("#0ea5e9");
            if (y + qHeight > 820) {
                doc.addPage();
                y = margin;
            }
            doc.rect(margin, y, 515, qHeight, "F");
            doc.setTextColor("#ffffff");
            doc.setFontSize(12);
            doc.text(qLines, margin + 10, y + 16);
            y += qHeight + 6;

            // Answer block (danger)
            const aText = f.a;
            const aLines = doc.splitTextToSize(aText, 480);
            const aHeight = aLines.length * 14 + 18;
            if (y + aHeight > 820) {
                doc.addPage();
                y = margin;
            }
            doc.setFillColor("#ef4444");
            doc.rect(margin, y, 515, aHeight, "F");
            doc.setTextColor("#ffffff");
            doc.setFontSize(11);
            doc.text(aLines, margin + 10, y + 16);
            y += aHeight + 18;

            // page break if needed
            if (y > 750 && i < visible.length - 1) {
                doc.addPage();
                y = margin;
            }
        }

        // footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(9);
            doc.setTextColor("#999");
            doc.text(`© ${new Date().getFullYear()} Birdview Insurance — All rights reserved.`, margin, 820);
            doc.text(`Page ${i} of ${pageCount}`, 500, 820);
        }

        doc.save("Birdview_FAQs.pdf");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6 md:p-12">
            <style>{`
        :root{
          --brand-primary: var(--color-primary, #0ea5e9);
          --brand-danger: var(--color-danger, #ef4444);
        }
      `}</style>

            {/* Hero */}
            <header className="max-w-6xl mx-auto mb-10">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-primary),rgba(255,255,255,0))] opacity-90" />
                        <div className="relative z-10 px-6 py-16 md:py-24 lg:py-28">
                            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-5xl font-semibold text-white">
                                        {brandName} Support & FAQs
                                    </h1>
                                    <p className="mt-3 text-lg text-white/90">
                                        Clear, concise answers to common questions about policies, claims, payments, and support.
                                    </p>

                                    <div className="mt-6 flex gap-3 items-center">
                                        <div className="relative w-full md:w-[420px]">
                                            <input
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Search for answers, e.g. 'claim', 'renewal'..."
                                                className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                                            />
                                            <span className="absolute right-4 top-3 text-white/80">🔎</span>
                                        </div>

                                        <button
                                            onClick={() => (window.location.href = '/contact')}
                                            className="rounded-full px-5 py-3 bg-white text-[var(--brand-primary)] font-medium shadow-md hover:opacity-95"
                                        >
                                            Contact Support
                                        </button>
                                    </div>
                                </div>

                                <div className="hidden md:block w-48 h-48 rounded-xl" aria-hidden>
                                    {/* Decorative brand mark or illustration placeholder */}
                                    <div className="w-full h-full bg-[linear-gradient(135deg,var(--brand-danger),var(--brand-primary))] rounded-xl shadow-2xl flex items-center justify-center text-white font-bold">
                                        {brandName.split(' ')[0]}
                                    </div>
                                </div>

                                {/* PDF button top-right */}
                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="hidden md:inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-4 py-2 rounded-full shadow-md hover:opacity-95"
                                    >
                                        📄 Download FAQ as PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left column - sections / contact */}
                    <aside className="col-span-1">
                        <div className="sticky top-6 space-y-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-800">Browse by topic</h4>
                                <div className="mt-3 flex flex-col gap-2">
                                    {sections.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSection(s as any)}
                                            className={`text-left px-3 py-2 rounded-md text-sm w-full ${section === s ? 'bg-[var(--brand-primary)] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-800">Need help now?</h4>
                                <p className="text-sm text-gray-600 mt-2">24/7 claims hotline and priority support for policyholders.</p>
                                <div className="mt-3">
                                    <a href="tel:+254700000000" className="block w-full text-center rounded-md px-3 py-2 bg-[var(--brand-danger)] text-white font-semibold">Call Claims</a>
                                </div>
                                <div className="mt-3 text-xs text-gray-500">Or email <a href="mailto:support@birdview.co.ke" className="underline">support@birdview.co.ke</a></div>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-800">Still can't find it?</h4>
                                <p className="text-sm text-gray-600 mt-2">Submit a support request and we'll get back within 1 business day.</p>
                                <div className="mt-3">
                                    <a href="/support/request" className="block w-full text-center rounded-md px-3 py-2 border border-[var(--brand-primary)] text-[var(--brand-primary)]">Open Request</a>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right column - faqs */}
                    <section className="col-span-3">
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h3>
                                <p className="text-sm text-gray-600 mt-2">Select a topic or search to narrow results. Click a question to view the answer.</p>

                                <div className="mt-6 border-t border-gray-100 pt-4 space-y-3">
                                    {visible.map((f) => (
                                        <div key={f.id} className="">
                                            <button
                                                id={f.id}
                                                onClick={() => {
                                                    setActive(active === f.id ? null : f.id);
                                                    // update hash for deep-linking
                                                    if (window && window.history && window.location) {
                                                        const newHash = `#${f.id}`;
                                                        history.replaceState(null, "", newHash);
                                                    }
                                                }}
                                                className="w-full text-left flex items-start justify-between gap-4 p-3 rounded-md hover:bg-gray-50"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-medium text-gray-800">{f.q}</span>
                                                    </div>
                                                    <div className="mt-2 text-xs text-gray-500">{f.section}</div>
                                                </div>

                                                <div className="shrink-0">
                                                    <motion.div animate={{ rotate: active === f.id ? 180 : 0 }} className="text-gray-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </motion.div>
                                                </div>
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {active === f.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                                        className="px-4 pb-4 text-sm text-gray-700"
                                                    >
                                                        <div className="prose max-w-none">{f.a}</div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}

                                    {visible.length === 0 && (
                                        <div className="p-6 text-center text-sm text-gray-600">No matching FAQs — try a different search.</div>
                                    )}
                                </div>
                            </div>

                            {/* Section summaries (optional) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <h5 className="font-semibold text-gray-800">Claims</h5>
                                    <p className="text-sm text-gray-600 mt-2">How to lodge claims, timeline expectations and required documentation.</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <h5 className="font-semibold text-gray-800">Payments</h5>
                                    <p className="text-sm text-gray-600 mt-2">Payment options, renewals, and invoices.</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <h5 className="font-semibold text-gray-800">Support</h5>
                                    <p className="text-sm text-gray-600 mt-2">Priority support and contact channels.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-6 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-danger)] text-white rounded-xl p-6 shadow-lg">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-xl font-semibold">Still have questions?</h4>
                                    <p className="text-sm mt-1 text-white/90">Our team is ready to help — whether it's a complex claim or a bespoke corporate policy.</p>
                                </div>

                                <motion.div
                                    ref={ref}
                                    initial="hidden"
                                    animate={controls}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.8, ease: "easeOut" },
                                        },
                                    }}
                                    className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-6 flex-nowrap"
                                >
                                    <a
                                        href="/contact"
                                        className="rounded-full px-5 py-2 sm:px-6 sm:py-2.5 bg-white text-[var(--brand-primary)] font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Contact us
                                    </a>

                                    <a
                                        href="/support/request"
                                        className="rounded-full px-5 py-2 sm:px-6 sm:py-2.5 border border-white text-white font-semibold shadow-md hover:bg-white hover:text-[var(--brand-primary)] transition-all duration-300 hover:scale-105"
                                    >
                                        Open a request
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
