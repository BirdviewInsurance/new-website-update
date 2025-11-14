"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    complaint: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Your complaint has been submitted successfully.");
        setFormData({ name: "", email: "", phone: "", complaint: "" });
      } else {
        toast.error(data.message || "Failed to submit complaint.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-24 px-6 md:px-20 overflow-hidden"
      style={{ backgroundImage: "url('/images/complaints.png')" }}
    >
      {/* Toast Notifications */}
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

      {/* Overlay + subtle blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/60 via-red-600/30 to-black/40 backdrop-blur-sm -z-10" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center text-white"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Complaints & Feedback
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          At{" "}
          <span className="font-semibold text-red-300">Birdview Insurance</span>
          , we take your satisfaction seriously. If you have experienced a
          concern, we are here to listen, investigate, and resolve it promptly.
        </p>

        <Card className="bg-white/95 dark:bg-gray-900/90 rounded-2xl border border-blue-100 dark:border-gray-700" shadow="lg">
          <CardBody className="p-8 md:p-10">
            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  required
                  className="text-gray-700"
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  variant="bordered"
                  onChange={handleChange}
                />
                <Input
                  required
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                variant="bordered"
                onChange={handleChange}
              />

              <Textarea
                required
                className="text-gray-700"
                label="Complaint Details"
                minRows={5}
                name="complaint"
                placeholder="Please describe your concern in detail..."
                value={formData.complaint}
                variant="bordered"
                onChange={handleChange}
              />

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold shadow-md hover:opacity-90 transition-all"
                  size="lg"
                  type="submit"
                  isLoading={loading} // ✅ Correct prop
                  disabled={loading}
                >
                  Submit Complaint
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <div className="mt-10 text-gray-200 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          <p>
            Our complaints process adheres to regulatory standards under the{" "}
            <span className="font-semibold text-red-300">Insurance Regulatory Authority (IRA)</span>. Once submitted, your complaint will be acknowledged within 24 hours, and a resolution will be provided within 14 business days.
          </p>
          <p className="mt-4">
            If your issue remains unresolved, you may escalate it to the{" "}
            <span className="text-blue-300 font-semibold">Commissioner of Insurance</span> for independent review.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
