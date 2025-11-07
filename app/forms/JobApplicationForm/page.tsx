"use client";

import React, { useState } from "react";
import { Input, Button, Card, CardBody, toast } from "@heroui/react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface FormdataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  resume: File | null;
  dateAvailable: string;
  desiredPay: string;
  website: string;
  linkedin: string;
  employer: string;
  position: string;
  experience: string;
  competencies: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

const JobApplicationForm: React.FC = () => {
  const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda"];
  const router = useRouter();

  const [formData, setFormData] = useState<FormdataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Kenya",
    resume: null,
    dateAvailable: "",
    desiredPay: "",
    website: "",
    linkedin: "",
    employer: "",
    position: "",
    experience: "",
    competencies: "",
  });

  const [loaderIcon, setLoaderIcon] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoaderIcon(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) data.append(key, val as any);
    });

    try {
      const res = await axios.post<ApiResponse>("/api/job-apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 10000,
      });

      if (res.status === 200) {
        (toast as any).success(
          res.data.message ||
            "✅ Application Submitted: Your application has been received.",
        );
        setTimeout(() => router.push("/"), 3000);
      } else {
        throw new Error(res.data.error || "Unknown error");
      }
    } catch (error: any) {
      (toast as any).error(
        error.response?.data?.error || error.message || "❌ Submission Failed",
      );
    } finally {
      setLoaderIcon(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
    >
      <Card className="w-full max-w-2xl shadow-xl border border-gray-200 rounded-2xl bg-white">
        <CardBody>
          <form
            className="max-w-3xl w-full mx-auto p-8 bg-white shadow-xl rounded-3xl border border-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <div className="mb-4">
                <Image
                  alt="Logo"
                  className="mx-auto"
                  height={50}
                  src="/images/logo.jpeg"
                  width={180}
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Job Application Form
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-3 mx-auto rounded-full" />
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Input
                required
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                required
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                required
                name="email"
                placeholder="Email*"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium mb-1">Phone*</label>
                <PhoneInput
                  country={"ke"}
                  inputStyle={{ width: "100%" }}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>

            {/* Address */}
            <Input
              required
              className="mt-4"
              name="address"
              placeholder="Address*"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input
                required
                name="city"
                placeholder="City*"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                required
                name="province"
                placeholder="Province/County*"
                value={formData.province}
                onChange={handleChange}
              />
              <Input
                required
                name="postalCode"
                placeholder="Postal Code*"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Country*</label>
              <select
                className="w-full border rounded-md p-2"
                name="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, country: e.target.value }))
                }
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Resume */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Resume*</label>
              <input
                required
                accept=".pdf,.doc,.docx"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            {/* Extra fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                name="dateAvailable"
                type="date"
                value={formData.dateAvailable}
                onChange={handleChange}
              />
              <Input
                name="desiredPay"
                placeholder="Desired Pay"
                value={formData.desiredPay}
                onChange={handleChange}
              />
            </div>

            <Input
              className="mt-4"
              name="website"
              placeholder="Website, Blog, or Portfolio"
              value={formData.website}
              onChange={handleChange}
            />
            <Input
              className="mt-4"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <Input
              required
              className="mt-4"
              name="employer"
              placeholder="Current Employer*"
              value={formData.employer}
              onChange={handleChange}
            />
            <Input
              required
              className="mt-4"
              name="position"
              placeholder="Current Position Title*"
              value={formData.position}
              onChange={handleChange}
            />
            <Input
              required
              className="mt-4"
              name="experience"
              placeholder="Years of Banking Experience*"
              value={formData.experience}
              onChange={handleChange}
            />

            <div className="text-center mt-6">
              <Button
                className="w-full md:w-auto px-8 py-3 rounded-full shadow-md text-white font-semibold"
                color="primary"
                isLoading={loaderIcon}
                type="submit"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
