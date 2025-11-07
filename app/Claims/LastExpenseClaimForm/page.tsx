"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Checkbox,
  Divider,
  toast,
  Spinner,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

export interface FormdataType {
  [key: string]: any;
}

const steps = ["Member Details", "Privacy & Consent"];

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const CustomStepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-between mb-6">
    {steps.map((step, idx) => (
      <div key={idx} className="flex flex-col items-center flex-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= idx
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {idx + 1}
        </div>
        <span
          className={`text-sm mt-1 ${
            currentStep === idx ? "text-primary font-semibold" : "text-gray-500"
          }`}
        >
          {step}
        </span>
        {idx !== steps.length - 1 && (
          <div className="flex-1 h-1 bg-gray-200 mt-4 relative">
            <div
              className={`absolute top-0 left-0 h-1 bg-primary transition-all duration-300`}
              style={{
                width: currentStep > idx ? "100%" : "0%",
              }}
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

export default function LastExpenseClaimForm() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormdataType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/last-expense-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        (toast as any).success("Last Expense Claim submitted ✅");
        setFormData({});
        setActiveStep(0);
      } else {
        (toast as any).error((data as any).error || "Submission failed ❌");
      }
    } catch {
      (toast as any).error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
    >
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl bg-white">
        <CardBody className="p-8 space-y-8">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-primary">
              Birdview Insurance
            </h1>
            <p className="text-lg text-gray-700">
              Last Expense Claim Form 2025
            </p>
          </div>

          {/* Custom Stepper */}
          <CustomStepper currentStep={activeStep} steps={steps} />

          {/* Step 1 */}
          {activeStep === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-4">
                Step 1: Member & Claim Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  label="Name of Member"
                  name="memberName"
                  value={formData.memberName || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Membership / Policy No."
                  name="policyNumber"
                  value={formData.policyNumber || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Mobile No."
                  name="memberPhone"
                  value={formData.memberPhone || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Amount Assured"
                  name="amountAssured"
                  value={formData.amountAssured || ""}
                  onChange={handleChange}
                />

                <Input
                  isRequired
                  label="Name of Claimant / Beneficiary"
                  name="claimantName"
                  value={formData.claimantName || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Relationship to Member"
                  name="relationship"
                  value={formData.relationship || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Claimant Address"
                  name="claimantAddress"
                  value={formData.claimantAddress || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Claimant Mobile No."
                  name="claimantPhone"
                  value={formData.claimantPhone || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Amount Claimed"
                  name="amountClaimed"
                  value={formData.amountClaimed || ""}
                  onChange={handleChange}
                />

                <Input
                  className="col-span-2"
                  label="Corporate / Group Name (if applicable)"
                  name="corporateGroup"
                  value={formData.corporateGroup || ""}
                  onChange={handleChange}
                />
              </div>

              <Divider className="my-6" />

              <h3 className="font-medium text-gray-700 mb-2">
                Mode of Payment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankName || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Branch"
                  name="bankBranch"
                  value={formData.bankBranch || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Account Name"
                  name="accountName"
                  value={formData.accountName || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Account No."
                  name="accountNumber"
                  value={formData.accountNumber || ""}
                  onChange={handleChange}
                />
                <Input
                  label="M-Pesa No."
                  name="mpesaNumber"
                  value={formData.mpesaNumber || ""}
                  onChange={handleChange}
                />
                <Input
                  label="M-Pesa Paybill"
                  name="mpesaPaybill"
                  value={formData.mpesaPaybill || ""}
                  onChange={handleChange}
                />
              </div>

              <Input
                className="mt-4"
                label="Reimbursement Amount"
                name="reimbursementAmount"
                value={formData.reimbursementAmount || ""}
                onChange={handleChange}
              />

              <Divider className="my-6" />

              <h3 className="font-medium text-primary mb-2">
                Approved By (Official Use)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Medical Assessor Name"
                  name="medicalAssessorName"
                  value={formData.medicalAssessorName || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Medical Assessor Signature"
                  name="medicalAssessorSignature"
                  value={formData.medicalAssessorSignature || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Claims Manager Name"
                  name="claimsManagerName"
                  value={formData.claimsManagerName || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Claims Manager Signature"
                  name="claimsManagerSignature"
                  value={formData.claimsManagerSignature || ""}
                  onChange={handleChange}
                />
              </div>

              <Divider className="my-6" />

              <h3 className="font-medium text-gray-700 mb-2">
                Required Supporting Documents
              </h3>
              <div className="space-y-2">
                <Checkbox
                  isSelected={formData.burialPermit || false}
                  name="burialPermit"
                  onChange={handleChange}
                >
                  Burial Permit
                </Checkbox>
                <Checkbox
                  isSelected={formData.deceasedIDCopy || false}
                  name="deceasedIDCopy"
                  onChange={handleChange}
                >
                  Copy of Deceased’s ID
                </Checkbox>
                <Checkbox
                  isSelected={formData.claimantIDCopy || false}
                  name="claimantIDCopy"
                  onChange={handleChange}
                >
                  Copy of Claimant’s ID
                </Checkbox>
                <Checkbox
                  isSelected={formData.bankMpesaDetails || false}
                  name="bankMpesaDetails"
                  onChange={handleChange}
                >
                  Bank / M-Pesa Details
                </Checkbox>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {activeStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-primary mb-4">
                Privacy Notice
              </h2>
              <div className="max-h-48 overflow-y-auto p-4 rounded-md bg-gray-50 text-sm text-gray-600 mb-4 space-y-3">
                <p>
                  Birdview Insurance is committed to protecting your personal
                  data. In line with the Data Protection Act, we collect, store,
                  and process your data strictly for insurance services, claims
                  processing, and regulatory compliance.
                </p>
                <p>
                  By signing this form, you consent to Birdview Insurance
                  collecting and processing your data, including sensitive
                  medical and financial information, for evaluating and paying
                  insurance claims.
                </p>
                <p>
                  Your data may be shared with service providers, regulators, or
                  reinsurers for the purposes outlined above. Birdview ensures
                  your data is safeguarded.
                </p>
                <p>
                  You have the right to access, correct, or request deletion of
                  your personal data held by Birdview, subject to applicable
                  law.
                </p>
              </div>

              <Checkbox
                isSelected={formData.consentMarketing || false}
                name="consentMarketing"
                onChange={handleChange}
              >
                I consent to my phone/email being used for marketing
                information.
              </Checkbox>
              <Checkbox
                isSelected={formData.consentMinor || false}
                name="consentMinor"
                onChange={handleChange}
              >
                I consent to Birdview processing data for a minor below 18
                years.
              </Checkbox>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  isRequired
                  label="Date"
                  name="privacyDate"
                  type="date"
                  value={formData.privacyDate || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Signature of Beneficiary"
                  name="privacySignature"
                  value={formData.privacySignature || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-between gap-4">
            {/* Back */}
            <motion.button
              className="w-full md:w-auto px-8 py-3 rounded-full shadow-md font-semibold flex items-center justify-center gap-2 group bg-blue-600 text-white disabled:opacity-50"
              disabled={activeStep === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{
                scale: 0.95,
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              onClick={handleBack}
            >
              <ArrowLeft className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </motion.button>

            {/* Next / Submit */}
            {activeStep === steps.length - 1 ? (
              <motion.button
                className="w-full md:w-auto px-8 py-3 rounded-full shadow-md font-semibold flex items-center justify-center gap-2 group bg-green-600 text-white disabled:opacity-50"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 500, damping: 20 },
                }}
                onClick={handleSubmit}
              >
                {loading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <>
                    Submit
                    <ArrowUp className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-y-1" />
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                className="w-full md:w-auto px-8 py-3 rounded-full shadow-md font-semibold flex items-center justify-center gap-2 group bg-blue-600 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 500, damping: 20 },
                }}
                onClick={handleNext}
              >
                Next
                <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
