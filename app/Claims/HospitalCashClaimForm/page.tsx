"use client";

import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  HeroUIProvider,
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  ShieldCheckIcon,
  PaperClipIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

const HospitalCashForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    hospitalName: "",
    admissionDate: "",
    dischargeDate: "",
    amountRequested: "",
    reason: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const openViewer = (file: File) => {
    setSelectedFile(file);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setSelectedFile(null);
    setIsViewerOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData, files);
    alert("✅ Your Hospital Cash Claim has been submitted successfully!");
  };

  return (
    <HeroUIProvider>
      <div
        className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 rounded-3xl overflow-hidden" shadow="lg">
            <CardBody className="p-10 bg-white/90 backdrop-blur-sm">
              <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-primary-700 via-blue-600 to-danger-600 bg-clip-text text-transparent mb-8">
                Hospital Cash Claim Form
              </h2>
              <p className="text-gray-600 text-center mb-10">
                Kindly fill in your details and upload the required documents
                for verification.
              </p>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    isRequired
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="National ID / Passport No."
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Hospital Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Hospital Name"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Amount Requested (KES)"
                    name="amountRequested"
                    type="number"
                    value={formData.amountRequested}
                    onChange={handleChange}
                  />
                  <Input
                    label="Admission Date"
                    name="admissionDate"
                    type="date"
                    value={formData.admissionDate}
                    onChange={handleChange}
                  />
                  <Input
                    label="Discharge Date"
                    name="dischargeDate"
                    type="date"
                    value={formData.dischargeDate}
                    onChange={handleChange}
                  />
                </div>

                <Textarea
                  label="Reason for Hospitalization / Claim"
                  name="reason"
                  placeholder="Provide a short description of your hospital claim..."
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                />

                {/* File Upload Section */}
                <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-all">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Upload Supporting Documents
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload ID, receipts, medical reports, or discharge summaries
                    (PDF, JPG, PNG).
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <input
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                    />
                    <Button
                      as="label"
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-5 py-2 rounded-lg cursor-pointer shadow hover:shadow-md transition-all"
                      htmlFor="file-upload"
                      startContent={<PaperClipIcon className="h-5 w-5" />}
                    >
                      Choose Files
                    </Button>
                    <span className="text-gray-600 text-sm">
                      {files.length} file(s) selected
                    </span>
                  </div>

                  {/* File Previews */}
                  {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                        >
                          <div className="flex flex-col w-40 truncate">
                            <p className="text-gray-800 text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              isIconOnly
                              className="text-blue-600 hover:text-blue-700"
                              variant="light"
                              onClick={() => openViewer(file)}
                            >
                              <EyeIcon className="h-5 w-5" />
                            </Button>
                            <Button
                              isIconOnly
                              className="text-red-600 hover:text-danger-700"
                              variant="light"
                              onClick={() => handleFileRemove(idx)}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="text-center pt-6">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                    radius="full"
                    size="lg"
                    startContent={<ShieldCheckIcon className="h-5 w-5" />}
                    type="submit"
                  >
                    Submit Claim
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* File Viewer Modal */}
      <Modal
        isOpen={isViewerOpen}
        placement="center"
        size="3xl"
        onOpenChange={setIsViewerOpen}
      >
        <ModalContent className="p-4 bg-white rounded-2xl shadow-2xl">
          <ModalHeader className="text-lg font-semibold text-gray-800 flex justify-between">
            File Preview
          </ModalHeader>
          <ModalBody className="flex items-center justify-center min-h-[400px]">
            {selectedFile && selectedFile.type.startsWith("image/") ? (
              <img
                alt={selectedFile.name}
                className="max-h-[500px] rounded-xl shadow-md"
                src={URL.createObjectURL(selectedFile)}
              />
            ) : selectedFile ? (
              <iframe
                className="w-full h-[500px] rounded-xl border"
                src={URL.createObjectURL(selectedFile)}
                title={selectedFile.name}
              />
            ) : (
              <p className="text-gray-500 text-sm">No file selected</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="font-medium text-white px-4 py-2 rounded-lg"
              color="danger"
              variant="solid"
              onClick={closeViewer}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HeroUIProvider>
  );
};

export default HospitalCashForm;
