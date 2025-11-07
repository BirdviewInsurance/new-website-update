"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Input,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";

interface Step2PolicyDetailsProps {
  formData?: Record<string, any>;
  updateFormData?: (data: Record<string, any>) => void;
}

const Step2PolicyDetails: React.FC<Step2PolicyDetailsProps> = ({
  formData = {},
  updateFormData = () => {},
}) => {
  // 🔹 Helper: safely add months
  const addMonths = (date: string, months: number) => {
    const d = new Date(date);

    d.setMonth(d.getMonth() + months);

    return d.toISOString().split("T")[0];
  };

  // 🔹 Auto-update "Certificate To Date"
  useEffect(() => {
    if (formData.certificateStartDate && formData.period) {
      let newEndDate = "";

      switch (formData.period) {
        case "One Month":
          newEndDate = addMonths(formData.certificateStartDate, 1);
          break;
        case "Six Months":
          newEndDate = addMonths(formData.certificateStartDate, 6);
          break;
        case "Full Year":
          newEndDate = addMonths(formData.certificateStartDate, 12);
          break;
      }
      if (!formData.certificateToDate || formData.autoCalculated)
        updateFormData({ certificateToDate: newEndDate, autoCalculated: true });
    }
  }, [formData.certificateStartDate, formData.period]);

  // 🔹 File upload handler
  const handleFilesChange = (field: string, e: any) => {
    const selectedFiles = Array.from(e.target.files).map((file: any) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    const existing = Array.isArray(formData[field]) ? formData[field] : [];

    updateFormData({ [field]: [...existing, ...selectedFiles] });
  };

  const removeFile = (field: string, index: number) => {
    const newFiles = formData[field].filter((_: any, i: number) => i !== index);

    updateFormData({ [field]: newFiles });
  };

  return (
    <motion.div
      key="step2"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="rounded-2xl shadow-2xl border border-gray-100 bg-white/80 backdrop-blur-sm hover:shadow-blue-100 transition-all duration-300">
        <CardHeader className="border-b pb-3">
          <h2 className="text-2xl font-bold text-blue-800 tracking-wide">
            Policy Details
          </h2>
        </CardHeader>

        <CardBody className="space-y-8 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Registration Number */}
            <Input
              label="Registration Number"
              placeholder="Enter registration number"
              type="text"
              value={formData.registrationNumber || ""}
              variant="flat"
              onChange={(e) =>
                updateFormData({ registrationNumber: e.target.value })
              }
            />

            {/* Chasis Number */}
            <Input
              label="Chasis Number"
              placeholder="Enter chasis number"
              type="text"
              value={formData.chasisNo || ""}
              variant="flat"
              onChange={(e) => updateFormData({ chasisNo: e.target.value })}
            />

            {/* Cover Type */}
            <RadioGroup
              className="mt-2"
              label="Cover Type"
              orientation="horizontal"
              value={formData.coverType || ""}
              onValueChange={(val) => updateFormData({ coverType: val })}
            >
              <Radio value="Comprehensive">Comprehensive</Radio>
              <Radio value="Third Party">Third Party</Radio>
            </RadioGroup>

            {/* Certificate Start Date */}
            <Input
              description="Select the start date for the certificate"
              label="Certificate Start Date"
              type="date"
              value={formData.certificateStartDate || ""}
              variant="flat"
              onChange={(e) =>
                updateFormData({
                  certificateStartDate: e.target.value,
                  autoCalculated: true,
                })
              }
            />

            {/* Period */}
            <RadioGroup
              label="Period"
              orientation="horizontal"
              value={formData.period || ""}
              onValueChange={(val) =>
                updateFormData({ period: val, autoCalculated: true })
              }
            >
              <Radio value="Full Year">Full Year</Radio>
            </RadioGroup>

            {/* Certificate To Date */}
            <Input
              description="Select the expiry date for the certificate"
              label="Certificate To Date"
              type="date"
              value={formData.certificateToDate || ""}
              variant="flat"
              onChange={(e) =>
                updateFormData({
                  certificateToDate: e.target.value,
                  autoCalculated: false,
                })
              }
            />
          </div>

          {/* Disclaimer Preview */}
          {formData.certificateStartDate && (
            <div className="p-4 rounded-xl border border-yellow-400 bg-yellow-50 shadow-sm">
              <p className="text-base text-gray-700 font-medium">
                <span className="block mb-2 font-semibold text-gray-800">
                  Disclaimer:
                </span>
                Your policy runs for twelve (12) months from{" "}
                <strong className="text-gray-900">
                  {new Date(formData.certificateStartDate).toLocaleDateString()}
                </strong>
                , ending on{" "}
                <span className="text-green-700 font-bold text-lg">
                  {formData.certificateToDate
                    ? new Date(formData.certificateToDate).toLocaleDateString()
                    : "—"}
                </span>
                .
              </p>
            </div>
          )}

          {/* Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                key: "idCopy",
                label: "ID Copy",
                color: "from-blue-500 to-indigo-600",
              },
              {
                key: "pinCopy",
                label: "PIN Copy",
                color: "from-green-500 to-emerald-600",
              },
              {
                key: "logBookOrKraPin",
                label: "Log Book / KRA PIN",
                color: "from-pink-500 to-rose-600",
              },
            ].map(({ key, label, color }) => {
              const files = formData[key] || [];

              return (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                  </label>

                  <label
                    className={`relative flex items-center justify-center w-full h-12 px-4 rounded-lg bg-gradient-to-r ${color} text-white font-medium cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
                  >
                    <span>Upload {label}</span>
                    <input
                      multiple
                      accept="image/*,application/pdf"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      onChange={(e) => handleFilesChange(key, e)}
                    />
                  </label>

                  {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {files.map((item: any, i: number) => (
                        <div key={i} className="relative inline-block">
                          {item.preview ? (
                            <img
                              alt={`${label} ${i + 1}`}
                              className="w-[100px] h-[100px] object-cover rounded-md border"
                              src={item.preview}
                            />
                          ) : (
                            <p className="text-sm text-gray-700 max-w-[120px] truncate border px-2 py-1 rounded-md bg-gray-100">
                              {item.file.name}
                            </p>
                          )}

                          <button
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition"
                            title="Remove file"
                            type="button"
                            onClick={() => removeFile(key, i)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vehicle Information */}
          <div className="pt-8 border-t mt-10">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Input
                label="Make"
                placeholder="Enter Vehicle Make"
                type="text"
                value={formData.vehicleMake || ""}
                onChange={(e) =>
                  updateFormData({ vehicleMake: e.target.value })
                }
              />

              <Select
                label="Year Of Manufacture"
                selectedKeys={
                  formData.yearOfMake ? [String(formData.yearOfMake)] : []
                }
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;

                  updateFormData({ yearOfMake: selected });
                }}
              >
                {[
                  <SelectItem key="select-year">Select Year</SelectItem>,
                  ...Array.from(
                    { length: new Date().getFullYear() - 1976 + 1 },
                    (_, i) => 1976 + i,
                  )
                    .reverse()
                    .map((year) => {
                      const yearStr = String(year);

                      return <SelectItem key={yearStr}>{yearStr}</SelectItem>;
                    }),
                ]}
              </Select>

              <Input
                label="License To Carry"
                placeholder="License to carry"
                type="text"
                value={formData.licenseToCarry || ""}
                onChange={(e) =>
                  updateFormData({ licenseToCarry: e.target.value })
                }
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default Step2PolicyDetails;
