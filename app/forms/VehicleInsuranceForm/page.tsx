"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Checkbox,
  toast,
} from "@heroui/react";
import { User, FileCheck, Truck } from "lucide-react";

import Step1InsuredDetails from "./steps/Step1InsuredDetails";
import Step2Policy_Vehicle_Details from "./steps/Step2Policy_Vehicle_Details";

export interface FormdataType {
  [key: string]: any;
}

const steps = [
  "Insured Details",
  "Policy & Vehicle Details",
  "Preview & Confirm",
];

const VehicleInsuranceForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormdataType>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Use toast.* in place of snackbar
  const showError = (msg: string) => (toast as any).error(msg);

  const showSuccess = (msg: string) => (toast as any).success(msg);

  const validateStep0 = () => {
    const requiredFields = ["products", "pinNumber", "policyHolder", "eimail"];
    const missing = requiredFields.some(
      (key) => !String(formData[key] || "").trim(),
    );

    if (missing) {
      showError(
        "❌ Please fill in all required insured details before continuing.",
      );

      return false;
    }

    return true;
  };

  const validateStep1 = () => {
    const requiredFields = [
      "registrationNumber",
      "chasisNo",
      "coverType",
      "certificateStartDate",
      "period",
      "certificateToDate",
      "vehicleMake",
      "yearOfMake",
      "licenseToCarry",
      "idCopy",
      "pinCopy",
      "logBookOrKraPin",
    ];

    const missing = requiredFields.some((key) => {
      const value = formData[key];

      if (Array.isArray(value)) return value.length === 0;

      return !value;
    });

    if (missing) {
      showError(
        "❌ Please complete all policy & vehicle details (including uploads) before continuing.",
      );

      return false;
    }

    return true;
  };

  const handleNext = () => {
    // Step 0 must pass before moving forward
    if (step === 0) {
      if (!validateStep0()) return;
      setStep(1);

      return;
    }

    // Step 1 must pass before moving to preview
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);

      return;
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const updateFormData = (newData: Partial<FormdataType>) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  const handleConfirmSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      // append primitive fields
      Object.keys(formData).forEach((key) => {
        const val = formData[key];

        if (!Array.isArray(val)) {
          data.append(key, val ?? "");
        }
      });

      // append file arrays (idCopy, pinCopy, logBookOrKraPin)
      ["idCopy", "pinCopy", "logBookOrKraPin"].forEach((field) => {
        const arr = formData[field] || [];

        if (Array.isArray(arr)) {
          arr.forEach((it: any) => {
            if (it?.file) data.append(field, it.file, it.file.name);
          });
        }
      });

      const res = await fetch("/api/insurance_form", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed");

      showSuccess("✅ Form submitted successfully!");
      if (result.fileUrl) window.open(result.fileUrl, "_blank");

      // Reset
      setFormData({});
      setStep(0);
    } catch (err: any) {
      console.error("Upload error:", err);
      showError(`❌ ${err?.message || "Submission failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
      >
        <Card className="shadow-lg border rounded-2xl overflow-visible">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-semibold">Preview & Confirm</h3>
            </div>
          </CardHeader>

          <CardBody className="space-y-6 text-sm">
            {/* Insured Details */}
            <section>
              <div className="flex items-center gap-2 text-sky-700 font-semibold mb-2">
                <User /> Insured Details
              </div>
              <div className="space-y-1">
                <div>
                  <strong>Products:</strong> {formData.products || "—"}
                </div>
                <div>
                  <strong>PIN Number:</strong> {formData.pinNumber || "—"}
                </div>
                <div>
                  <strong>Policy Holder:</strong> {formData.policyHolder || "—"}
                </div>
                <div>
                  <strong>Email:</strong> {formData.eimail || "—"}
                </div>

                <div className="mt-2">
                  <Checkbox
                    isSelected={Boolean(formData.timeOnRisk)}
                    onValueChange={(val) =>
                      updateFormData({ timeOnRisk: !!val })
                    }
                  >
                    Time On Risk
                  </Checkbox>
                </div>
              </div>
            </section>

            {/* Policy Details */}
            <section>
              <div className="flex items-center gap-2 text-sky-700 font-semibold mb-2">
                <FileCheck /> Policy Details
              </div>
              <div className="space-y-1">
                <div>
                  <strong>Registration Number:</strong>{" "}
                  {formData.registrationNumber || "—"}
                </div>
                <div>
                  <strong>Chasis Number:</strong> {formData.chasisNo || "—"}
                </div>
                <div>
                  <strong>Cover Type:</strong> {formData.coverType || "—"}
                </div>
                <div>
                  <strong>Certificate Start:</strong>{" "}
                  {formData.certificateStartDate || "—"}
                </div>
                <div>
                  <strong>Period:</strong> {formData.period || "—"}
                </div>
                <div>
                  <strong>Certificate End:</strong>{" "}
                  {formData.certificateToDate || "—"}
                </div>
              </div>
            </section>

            {/* Vehicle Info */}
            <section>
              <div className="flex items-center gap-2 text-sky-700 font-semibold mb-2">
                <Truck /> Vehicle Information
              </div>
              <div className="space-y-1">
                <div>
                  <strong>Make:</strong> {formData.vehicleMake || "—"}
                </div>
                <div>
                  <strong>Year Of Manufacture:</strong>{" "}
                  {formData.yearOfMake || "—"}
                </div>
                <div>
                  <strong>License To Carry:</strong>{" "}
                  {formData.licenseToCarry || "—"}
                </div>
              </div>
            </section>

            {/* Uploaded Files */}
            <section>
              <div className="flex items-center gap-2 text-sky-700 font-semibold mb-2">
                📎 Uploaded Files
              </div>

              {(["idCopy", "pinCopy", "logBookOrKraPin"] as const).map(
                (field, idx) => {
                  const labels = [
                    "ID Copy",
                    "PIN Copy",
                    "Log Book / KRA PIN Copy",
                  ];
                  const files = Array.isArray(formData[field])
                    ? formData[field]
                    : [];

                  const removeFile = (index: number) => {
                    const newFiles = files.filter(
                      (_: any, i: number) => i !== index,
                    );

                    updateFormData({ [field]: newFiles });
                  };

                  return (
                    <div key={field} className="mb-4">
                      <div className="font-medium">{labels[idx]}:</div>
                      {files.length > 0 ? (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {files.map((f: any, i: number) => (
                            <div
                              key={i}
                              className="relative w-[88px] h-[88px] rounded-md border overflow-hidden bg-gray-50"
                            >
                              {f.preview ? (
                                // image preview
                                // note: using `f.preview` if present, else just filename box
                                // make sure caller sets preview via URL.createObjectURL(file)
                                // revoke objectURL handled by uploader step
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  alt={f.file?.name || "file"}
                                  className="w-full h-full object-cover"
                                  src={f.preview}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center p-2 text-xs text-gray-700 text-center">
                                  {f.file?.name || "file"}
                                </div>
                              )}

                              <button
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-md hover:bg-red-700 transition"
                                title="Remove file"
                                type="button"
                                onClick={() => removeFile(i)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 mt-1">
                          No files attached
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </section>
          </CardBody>

          <div className="flex justify-center items-center px-6 py-4 border-t">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-sky-600 text-white px-6 py-3 rounded-lg shadow-lg"
              disabled={loading}
              onClick={handleConfirmSubmit}
            >
              {loading ? "Submitting..." : "Confirm & Submit"}
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData };

    switch (step) {
      case 0:
        return <Step1InsuredDetails {...stepProps} />;
      case 1:
        return <Step2Policy_Vehicle_Details {...stepProps} />;
      case 2:
        return renderPreview();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="relative w-full max-w-4xl">
        <motion.div
          key={step}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100"
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-3xl font-bold mb-3 text-center">
            Insurance Proposal
          </h1>
          <div className="mb-4 text-center text-sm text-gray-600">
            Step {step + 1} of {steps.length} —{" "}
            <span className="font-medium">{steps[step]}</span>
          </div>

          <div>{renderStep()}</div>

          <div className="mt-6 flex justify-between items-center gap-3">
            <button
              className="px-4 py-2 rounded-md border bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50"
              disabled={step === 0 || loading}
              onClick={handleBack}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-3">
              {step < steps.length - 1 && (
                <button
                  className="px-5 py-2 rounded-md bg-sky-600 text-white shadow-md hover:bg-sky-700 disabled:opacity-50"
                  disabled={loading}
                  onClick={handleNext}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VehicleInsuranceForm;
