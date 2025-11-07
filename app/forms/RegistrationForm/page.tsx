"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ✅ HeroUI Imports
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Badge,
  toast,
} from "@heroui/react";

// ✅ Optional small motion wrappers
const AnimationDownToUp: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const AnimationRightToLeft: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    animate={{ opacity: 1, x: 0 }}
    initial={{ opacity: 0, x: 30 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export interface FormdataType {
  fullnames: string;
  mobileno: string;
  email: string;
  agencies: string;
}

const RegForm: React.FC = () => {
  const [formData, setFormData] = useState<FormdataType>({
    fullnames: "",
    mobileno: "",
    email: "",
    agencies: "",
  });
  const [loaderIcon, setLoaderIcon] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // ✅ HeroUI Toast helpers
  const showSuccess = (message: string) => (toast as any).success(message);

  const showError = (message: string) => (toast as any).error(message);

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mobileno: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoaderIcon(true);
    setSubmitted(true);

    try {
      const res = await axios.post("/api/registration-form", formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      setFormData({ fullnames: "", mobileno: "", email: "", agencies: "" });

      if (res.status === 200) {
        const data = res.data as any;

        showSuccess(data?.message || "Form submitted successfully!");
      } else {
        const data = res.data as any;

        showError(data?.error || "Something went wrong");
      }
    } catch (error: any) {
      showError(
        error?.response?.data?.error || error.message || "Submission failed",
      );
    } finally {
      setLoaderIcon(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-10">
      <Card className="w-full max-w-3xl shadow-2xl rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md">
        {/* ✅ Header with Corporate Feel */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-semibold">Attendee Registration</h2>
            <p className="text-blue-100 text-sm">
              High-end corporate registration form
            </p>
          </div>
          <Badge className="uppercase" color="primary" variant="flat">
            Premium
          </Badge>
        </CardHeader>

        {/* ✅ Card Body */}
        <CardBody className="p-10 bg-white rounded-b-2xl">
          {/* ✅ Loader Overlay */}
          {loaderIcon && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-150" />
                <div className="w-4 h-4 bg-sky-600 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          )}

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
            initial={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Top Info */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">
                  Event Attendance Form
                </h3>
                <p className="text-slate-500">
                  Please fill in your details accurately to complete
                  registration.
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimationRightToLeft>
                  <Input
                    required
                    className="bg-slate-50"
                    disabled={submitted}
                    label="Full Name"
                    name="fullnames"
                    radius="lg"
                    value={formData.fullnames}
                    variant="bordered"
                    onChange={handleChange}
                  />
                </AnimationRightToLeft>

                <AnimationDownToUp>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <PhoneInput
                      containerClass="w-full"
                      country="ke"
                      disabled={submitted}
                      inputStyle={{
                        width: "100%",
                        height: "52px",
                        borderRadius: "10px",
                        borderColor: "#ddd",
                        fontSize: "15px",
                      }}
                      value={formData.mobileno}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </AnimationDownToUp>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimationDownToUp>
                  <Input
                    required
                    disabled={submitted}
                    label="Email Address"
                    name="email"
                    radius="lg"
                    type="email"
                    value={formData.email}
                    variant="bordered"
                    onChange={handleChange}
                  />
                </AnimationDownToUp>

                <AnimationRightToLeft>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Agency Representation
                    </label>
                    <textarea
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      disabled={submitted}
                      name="agencies"
                      rows={4}
                      value={formData.agencies}
                      onChange={handleChange}
                    />
                  </div>
                </AnimationRightToLeft>
              </div>

              {/* Submit Button */}
              <motion.div
                className="flex justify-center mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  className={`relative px-10 py-5 text-lg font-semibold rounded-xl text-white shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-400/40 transition-all duration-300 ease-in-out ${
                    submitted ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={submitted}
                  type="submit"
                >
                  {submitted ? "Submitted" : "Submit"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegForm;
