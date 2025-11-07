"use client";

import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  HeroUIProvider,
  Input,
  Select,
  SelectItem,
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
  ClipboardDocumentCheckIcon,
  PaperClipIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

const MedicalCoverForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    coverType: "",
    dependants: "",
    conditions: "",
    hospitalPreference: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const coverOptions = ["Individual", "Family", "Corporate Group"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = Array.from(e.target.files);

      setFiles((prev) => [...prev, ...uploaded]);
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
    console.log("Form submitted:", formData, files);
    alert("✅ Your Medical Cover Application has been submitted successfully!");
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
                Medical Cover Application
              </h2>
              <p className="text-gray-600 text-center mb-10">
                Apply for a Birdview Medical Cover designed to meet your
                personal or group needs. Upload supporting documents for faster
                approval.
              </p>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Information */}
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

                {/* Cover Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    aria-label="Select Cover Type"
                    className="w-full"
                    label="Type of Cover"
                    radius="lg"
                    selectedKeys={[formData.coverType]}
                    variant="bordered"
                    onSelectionChange={(keys) =>
                      setFormData({
                        ...formData,
                        coverType: Array.from(keys)[0] as string,
                      })
                    }
                  >
                    {coverOptions.map((opt) => (
                      <SelectItem key={opt}>{opt}</SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Number of Dependants"
                    name="dependants"
                    type="number"
                    value={formData.dependants}
                    onChange={handleChange}
                  />
                </div>

                {/* Health & Preferences */}
                <Textarea
                  label="Pre-existing Conditions (if any)"
                  name="conditions"
                  placeholder="List any chronic or pre-existing medical conditions..."
                  rows={4}
                  value={formData.conditions}
                  onChange={handleChange}
                />

                <Textarea
                  label="Preferred Hospital(s)"
                  name="hospitalPreference"
                  placeholder="Specify your preferred hospitals or clinics..."
                  rows={3}
                  value={formData.hospitalPreference}
                  onChange={handleChange}
                />

                {/* Upload Documents */}
                <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-all">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Upload Supporting Files
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload ID copies, dependants list, company authorization
                    letter, or previous medical cards (PDF/JPG/PNG).
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
                              className="text-blue-600 hover:text-blue-500"
                              variant="light"
                              onClick={() => openViewer(file)}
                            >
                              <EyeIcon className="h-5 w-5" />
                            </Button>
                            <Button
                              isIconOnly
                              className="text-red-600 hover:text-red-500"
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
                    startContent={
                      <ClipboardDocumentCheckIcon className="h-5 w-5" />
                    }
                    type="submit"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Modal File Viewer */}
      <Modal
        isOpen={isViewerOpen}
        placement="center"
        size="3xl"
        onOpenChange={setIsViewerOpen}
      >
        <ModalContent className="p-4 bg-white rounded-2xl shadow-2xl">
          <ModalHeader className="text-lg font-semibold text-gray-800">
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

export default MedicalCoverForm;
