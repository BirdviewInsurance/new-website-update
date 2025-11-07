"use client";

import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, CheckCircle, AlertTriangle } from "lucide-react";

interface ToastProps {
  open: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, type, message, onClose }) => {
  const variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.95 },
  };

  const bgColors = {
    success:
      "bg-gradient-to-br from-emerald-600/80 to-green-700/70 text-white backdrop-blur-xl border border-emerald-400/30",
    error:
      "bg-gradient-to-br from-rose-600/80 to-red-700/70 text-white backdrop-blur-xl border border-red-400/30",
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 4000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate="visible"
          className={`fixed bottom-8 right-8 z-50 shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-3 ${bgColors[type as keyof typeof bgColors]} `}
          exit="exit"
          initial="hidden"
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          variants={variants}
        >
          {type === "success" ? (
            <CheckCircle className="text-white" size={24} />
          ) : (
            <AlertTriangle className="text-white" size={24} />
          )}
          <p className="text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface RepStream {
  stream_name: string;
  source?: string;
}

interface FormErrors {
  [key: string]: string;
}

const CreateAgent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [repStreams, setRepStreams] = useState<RepStream[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const [formData, setFormData] = useState({
    principal_id: "",
    first_name: "",
    middle_name: "",
    surname: "",
    gender: "",
    email: "",
    mobile_no: "",
    other_phone: "",
    kra: "",
    id_number: "",
    id_type: "",
    partner_name: "",
    partner_type: "",
    partner_mobile_no: "",
    partner_email: "",
    role: "agent",
    source: "",
    rep_streams: [] as RepStream[],
    created_at: "",
  });

  useEffect(() => {
    loadRepStreams();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.mobile_no.trim())
      newErrors.mobile_no = "Mobile number is required";
    if (!formData.id_type) newErrors.id_type = "ID type is required";
    if (!formData.id_number.trim())
      newErrors.id_number = "ID number is required";
    if (!formData.source) newErrors.source = "Partner source is required";
    if (!formData.rep_streams || formData.rep_streams.length === 0)
      newErrors.rep_streams = "Select at least one stream";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const loadRepStreams = async () => {
    try {
      const res = await fetch(
        "https://snownet-core-server.onrender.com/api/streams/streamReps",
      );
      const data = await res.json();
      const mapped = Array.isArray(data)
        ? data
            .map((item) => ({
              stream_name: item.rep_stream,
              source: item.source,
            }))
            .filter(Boolean)
        : [];

      setRepStreams(mapped);
    } catch (err) {
      console.error("Failed to fetch rep streams:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const payload = {
      ...formData,
      partner_type: formData.source,
      partner_name: formData.source,
      password: "anida",
    };

    try {
      const res = await fetch(
        "https://snownet-core-server.onrender.com/api/partner",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const err = await res.json();

        throw new Error(err.message || "Failed to create agent");
      }

      setToast({
        open: true,
        type: "success",
        message: "Agent created successfully!",
      });

      setFormData({
        principal_id: "",
        first_name: "",
        middle_name: "",
        surname: "",
        gender: "",
        email: "",
        mobile_no: "",
        other_phone: "",
        kra: "",
        id_number: "",
        id_type: "",
        partner_name: "",
        partner_type: "",
        partner_mobile_no: "",
        partner_email: "",
        role: "agent",
        source: "",
        rep_streams: [] as RepStream[],
        created_at: "",
      });
    } catch (error: any) {
      console.error(error);
      setToast({
        open: true,
        type: "error",
        message: error?.message || "Failed to create agent.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center py-12 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen"
        initial={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full max-w-5xl rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl border border-gray-100">
          <CardHeader className="w-full flex justify-center text-center pb-0">
            <div className="flex flex-col items-center gap-3 max-w-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <UserPlus className="text-white" size={38} />
              </div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Create New Agent
              </h2>
              <p className="text-gray-500 text-sm">
                Fill in the details below to add a new agent.
              </p>
            </div>
          </CardHeader>

          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  isRequired
                  errorMessage={errors.first_name}
                  label="First Name"
                  name="first_name"
                  validationState={errors.first_name ? "invalid" : "valid"}
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <Input
                  label="Middle Name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  errorMessage={errors.surname}
                  label="Surname"
                  name="surname"
                  validationState={errors.surname ? "invalid" : "valid"}
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>

              {/* Gender & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  isRequired
                  errorMessage={errors.gender}
                  label="Gender"
                  name="gender"
                  selectedKeys={formData.gender ? [formData.gender] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((prev) => ({ ...prev, gender: selected }));
                  }}
                >
                  <SelectItem key="M">Male</SelectItem>
                  <SelectItem key="F">Female</SelectItem>
                </Select>

                <Input
                  isRequired
                  errorMessage={errors.email}
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isRequired
                  errorMessage={errors.mobile_no}
                  label="Mobile Number"
                  name="mobile_no"
                  type="tel"
                  value={formData.mobile_no}
                  onChange={handleChange}
                />
                <Input
                  label="Other Phone"
                  name="other_phone"
                  type="tel"
                  value={formData.other_phone}
                  onChange={handleChange}
                />
              </div>

              {/* ID & KRA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="KRA PIN"
                  name="kra"
                  value={formData.kra}
                  onChange={handleChange}
                />
                <Select
                  isRequired
                  errorMessage={errors.id_type}
                  label="ID Type"
                  name="id_type"
                  selectedKeys={formData.id_type ? [formData.id_type] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((prev) => ({
                      ...prev,
                      id_type: selected,
                    }));
                  }}
                >
                  <SelectItem key="nID">National ID</SelectItem>
                  <SelectItem key="pID">Passport</SelectItem>
                </Select>
                <Input
                  isRequired
                  errorMessage={errors.id_number}
                  label="ID Number"
                  name="id_number"
                  value={formData.id_number}
                  onChange={handleChange}
                />
              </div>

              {/* Partner Section */}
              <div className="border-l-4 border-blue-500 pl-4 mt-4">
                <h3 className="text-lg font-semibold text-blue-600">
                  Partner Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  isRequired
                  errorMessage={errors.source}
                  label="Partner Source"
                  name="source"
                  selectedKeys={formData.source ? [formData.source] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((prev) => ({ ...prev, source: selected }));
                  }}
                >
                  <SelectItem key="amsea">AMSEA</SelectItem>
                  <SelectItem key="welfare">Welfare</SelectItem>
                </Select>

                <Select
                  errorMessage={errors.rep_streams}
                  label="Streams"
                  placeholder="Select streams"
                  selectedKeys={
                    new Set(formData.rep_streams.map((s) => s.stream_name))
                  }
                  selectionMode="multiple"
                  onSelectionChange={(keys) => {
                    const selectedNames = Array.from(keys) as string[];

                    setFormData((prev) => ({
                      ...prev,
                      rep_streams: selectedNames.map((name) => ({
                        stream_name: name,
                        source: formData.source,
                      })),
                    }));
                  }}
                >
                  {repStreams
                    .filter((s) => s.source === formData.source)
                    .map((s) => (
                      <SelectItem key={s.stream_name}>
                        {s.stream_name}
                      </SelectItem>
                    ))}
                </Select>
              </div>

              <CardFooter className="flex justify-center pt-8">
                <Button
                  className="px-10 text-lg font-semibold shadow-md hover:shadow-xl transition-all text-white"
                  color="primary"
                  isLoading={isSubmitting}
                  radius="full"
                  size="lg"
                  type="submit"
                >
                  Create Agent
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </motion.div>

      <Toast
        message={toast.message}
        open={toast.open}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default CreateAgent;
