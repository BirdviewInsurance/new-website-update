"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function SupportRequestPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget; // keep reference to the form
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/support-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Failed to send request");

            toast.success("Your support request has been submitted successfully!");

            // Clear form after success
            form.reset();
        } catch (err: any) {
            toast.error(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6 md:p-12 relative">
            {/* Embedded Toaster */}
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        borderRadius: "10px",
                        background: "#1a202c",
                        color: "#fff",
                        padding: "12px 20px",
                        fontWeight: 500,
                    },
                    success: {
                        style: { background: "#16a34a", color: "#fff" },
                        duration: 4000,
                    },
                    error: {
                        style: { background: "#dc2626", color: "#fff" },
                        duration: 4000,
                    },
                }}
            />

            {/* Header */}
            <div className="max-w-4xl mx-auto mb-10">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 opacity-90" />
                    <div className="relative z-10 p-10">
                        <h1 className="text-4xl font-semibold text-white">Submit Support Request</h1>
                        <p className="mt-3 text-white/90 max-w-2xl">
                            Need personalised help? Fill out the form below and our support team will get
                            back to you within one business day.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="yourname@example.com"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="+254 7XX XXX XXX"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Request Category</label>
                        <select
                            name="category"
                            required
                            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                        >
                            <option value="">Select category</option>
                            <option>Claims Support</option>
                            <option>Policy Update</option>
                            <option>Payments / Renewal</option>
                            <option>Technical Issue</option>
                            <option>General Support</option>
                        </select>
                    </div>

                    {/* Policy Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Policy Number (optional)</label>
                        <input
                            type="text"
                            name="policyNumber"
                            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Enter your policy number"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Describe Your Issue</label>
                        <textarea
                            name="message"
                            required
                            className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            rows={5}
                            placeholder="Tell us what you need help with..."
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg transition disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Request"}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
