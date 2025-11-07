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
        (toast as any).success(
          (res.data as any).message || "Your claim has been received.",
        );
        handleReset();
      } else {
        (toast as any).error(
          (res.data as any).error || "Something went wrong.",
        );
      }
    } catch (error: any) {
      (toast as any).error(
        error.response?.data?.error || error.message || "Submission error",
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
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
            </div>
          )}

          {/* Logo + Heading */}
          <div className="text-center mb-10">
            <Image
              alt="Company Logo"
              className="mx-auto mb-4"
              height={60}
              src="/images/logo.jpeg"
              width={200}
            />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Insurance Claim Form
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Submit your policy claims securely with supporting documents.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              isRequired
              label="Policy Number"
              name="policy_no"
              placeholder="Enter your policy number"
              radius="lg"
              value={formData.policy_no}
              variant="bordered"
              onChange={handleChange}
            />

            <Input
              isRequired
              label="National ID Number"
              name="national_id"
              placeholder="Enter your national ID"
              radius="lg"
              value={formData.national_id}
              variant="bordered"
              onChange={handleChange}
            />

            <Input
              isRequired
              label="Contact Person"
              name="contactperson"
              placeholder="Enter contact person name"
              radius="lg"
              value={formData.contactperson}
              variant="bordered"
              onChange={handleChange}
            />

            {/* File Upload */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="upload-files"
              >
                Upload Supporting Documents
              </label>
              <input
                multiple
                className="hidden"
                id="upload-files"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-files">
                <Button
                  as="span"
                  className="font-semibold text-white"
                  color="success"
                  variant="shadow"
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
                className="px-10 text-white font-semibold"
                color="primary"
                radius="lg"
                size="lg"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="px-10 text-white font-semibold"
                color="danger"
                radius="lg"
                size="lg"
                type="reset"
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
