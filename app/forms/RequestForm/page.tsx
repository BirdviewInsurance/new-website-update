"use client";

import React, { useState } from "react";
import { Input, Textarea, Button, Card } from "@heroui/react";
import { toast } from "@heroui/react"; // ✅ HeroUI toast
import { Loader2 } from "lucide-react";

interface FormdataType {
  fullname: string;
  request: string;
  endgoal: string;
  requesteffect: string;
}

const Request: React.FC = () => {
  const [formData, setFormData] = useState<FormdataType>({
    fullname: "",
    request: "",
    endgoal: "",
    requesteffect: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      fullname: "",
      request: "",
      endgoal: "",
      requesteffect: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        (toast as any).success(data?.message || "Your request has been sent successfully.");
        handleReset();
      } else {
        (toast as any).error(data?.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      (toast as any).error(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
    >
      <Card className="w-full max-w-3xl shadow-2xl rounded-3xl border border-gray-200/60 
                       bg-white/90 backdrop-blur-md p-8">
        {/* Card Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Corporate Request Form
          </h2>
          <p className="text-gray-500 text-sm">
            (Disclaimer: Changes take effect after 1 week)
          </p>
        </div>

        {/* Card Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fullname + Request */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <Input
                required
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter full name"
                className="rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Request
              </label>
              <Input
                required
                name="request"
                value={formData.request}
                onChange={handleChange}
                placeholder="Enter your request"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* End Goal + Request Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                End Goal
              </label>
              <Textarea
                name="endgoal"
                value={formData.endgoal}
                onChange={handleChange}
                placeholder="Describe the expected outcome"
                rows={4}
                className="rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Request Effect
              </label>
              <Textarea
                required
                name="requesteffect"
                value={formData.requesteffect}
                onChange={handleChange}
                placeholder="Describe the effect of this request"
                rows={4}
                className="rounded-lg"
                isRequired
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl font-semibold shadow-lg 
                         bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                         hover:opacity-90 transition"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>

            <Button
              type="button"
              variant="flat"
              onClick={handleReset}
              className="px-8 py-3 rounded-xl font-semibold shadow-lg bg-red-600 text-white hover:bg-red-700"
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Request;
