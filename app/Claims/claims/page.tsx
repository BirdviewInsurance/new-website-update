"use client";

import React, { useState } from "react";
import { Input, Button, Card, CardBody, toast } from "@heroui/react";
import Image from "next/image";
import axios from "axios";

export interface FormdataType {
  policy_no: string;
  national_id: string;
  contactperson: string;
  supportingDocuments: File[];
}

const ClaimForm: React.FC = () => {
  const [formData, setFormData] = useState<FormdataType>({
    policy_no: "",
    national_id: "",
    contactperson: "",
    supportingDocuments: [],
  });

  const [fileError, setFileError] = useState<string>("");
  const [loaderIcon, setLoaderIcon] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      setFileError("One or more files exceed the 5MB size limit.");
      return;
    }

    setFileError("");
    setFormData((prevData) => ({
      ...prevData,
      supportingDocuments: files,
    }));
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      policy_no: "",
      national_id: "",
      contactperson: "",
      supportingDocuments: [],
    });
    setFileError("");
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoaderIcon(true);

    try {
      const data = new FormData();
      data.append("policy_no", formData.policy_no);
      data.append("national_id", formData.national_id);
      data.append("contactperson", formData.contactperson);
      formData.supportingDocuments.forEach((file) => {
        data.append("supportingDocuments", file);
      });

      const res = await axios.post("/api/send-claim", data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 10000,
      });

      if (res.status === 200) {
        (toast as any).success((res.data as any).message || "Your claim has been received.");
        handleReset();
      } else {
        (toast as any).error((res.data as any).error || "Something went wrong.");
      }
    } catch (error: any) {
      (toast as any).error(
        error.response?.data?.error || error.message || "Submission error"
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
      <Card className="w-full max-w-2xl shadow-2xl border border-gray-200 rounded-3xl bg-white/95 backdrop-blur-lg">
        <CardBody className="p-10">
          {loaderIcon && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Logo + Heading */}
          <div className="text-center mb-10">
            <Image
              src="/images/logo.jpeg"
              alt="Company Logo"
              width={200}
              height={60}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Insurance Claim Form
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Submit your policy claims securely with supporting documents.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              isRequired
              name="policy_no"
              label="Policy Number"
              placeholder="Enter your policy number"
              value={formData.policy_no}
              onChange={handleChange}
              variant="bordered"
              radius="lg"
            />

            <Input
              isRequired
              name="national_id"
              label="National ID Number"
              placeholder="Enter your national ID"
              value={formData.national_id}
              onChange={handleChange}
              variant="bordered"
              radius="lg"
            />

            <Input
              isRequired
              name="contactperson"
              label="Contact Person"
              placeholder="Enter contact person name"
              value={formData.contactperson}
              onChange={handleChange}
              variant="bordered"
              radius="lg"
            />

            {/* File Upload */}
            <div>
              <label
                htmlFor="upload-files"
                className="block text-gray-700 font-medium mb-2"
              >
                Upload Supporting Documents
              </label>
              <input
                type="file"
                id="upload-files"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="upload-files">
                <Button
                  as="span"
                  color="success"
                  variant="shadow"
                  className="font-semibold text-white"
                >
                  Choose Files
                </Button>
              </label>

              {fileError && (
                <p className="text-red-500 text-sm mt-2">{fileError}</p>
              )}

              {formData.supportingDocuments.length > 0 && (
                <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                  {formData.supportingDocuments.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="lg"
                className="px-10 text-white font-semibold"
              >
                Submit
              </Button>
              <Button
                type="reset"
                color="danger"
                size="lg"
                radius="lg"
                className="px-10 text-white font-semibold"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ClaimForm;
