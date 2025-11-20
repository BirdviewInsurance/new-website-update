"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  toast,
} from "@heroui/react";
import {
  CubeTransparentIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  SparklesIcon,
  XCircleIcon,
  TrophyIcon,
  GlobeAltIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import axios from "axios";

const perils = [
  {
    title: "Theft",
    icon: <ExclamationCircleIcon className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Mortality",
    icon: <XCircleIcon className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Disease",
    icon: <SparklesIcon className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Epidemics",
    icon: <ShieldCheckIcon className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Predation",
    icon: <UserGroupIcon className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Upwelling",
    icon: <CubeTransparentIcon className="w-10 h-10 text-blue-600" />,
  },
];

const benefits = [
  { title: "Guaranteed ROI", img: "/assets/productsPhotos/aqua6.jpeg" },
  {
    title: "Disease & Mortality Protection",
    img: "/assets/productsPhotos/aqua7.jpeg",
  },
  {
    title: "Predator Attack Support",
    img: "/assets/productsPhotos/aqua8.jpeg",
  },
  { title: "Flood/Storm Recovery", img: "/assets/productsPhotos/aqua10.jpeg" },
  {
    title: "Water Quality Maintenance",
    img: "/assets/productsPhotos/aqua11.jpeg",
  },
  {
    title: "Transport Loss Coverage",
    img: "/assets/productsPhotos/aqua9.jpeg",
  },
  {
    title: "Infrastructure Protection",
    img: "/assets/productsPhotos/aqua12.jpeg",
  },
];

const speciesCovered = [
  { name: "Tilapia", img: "/assets/productsPhotos/aqua/tilapia.jpeg" },
  { name: "Trout", img: "/assets/productsPhotos/aqua/trout.jpeg" },
  { name: "Nile Perch", img: "/assets/productsPhotos/aqua/nile_perch.jpeg" },
  { name: "Catfish", img: "/assets/productsPhotos/aqua/catfish.jpeg" },
];

export default function AquacultureInsurance() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    request: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, phone, request } = form;

    if (!name || !email || !phone || !request) {
      return (toast as any).error("Please fill all fields.");
    }

    setLoading(true);
    try {
      await axios.post("/api/sendAquacultureRequest", form);
      setSuccess(true);
      (toast as any).success("Request submitted successfully!");
      setTimeout(() => {
        setOpenModal(false);
        setForm({ name: "", email: "", phone: "", request: "" });
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      (toast as any).error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f7fa] min-h-screen px-4 md:px-12 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl mb-20"
      >
        <div
          className="relative h-[500px] flex flex-col justify-center items-center text-center 
               bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/productsPhotos/bg_aqua.jpg')",
          }}
        >
          {/* Deep corporate aqua-blue overlay */}
          <div className="absolute inset-0 bg-gradient-to-r 
      from-blue-900/80 via-blue-800/70 to-blue-600/80" />

          {/* Glass shimmer effect */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

          {/* Floating light particles (premium brand effect) */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="absolute w-72 h-72 bg-blue-300/10 blur-[90px] rounded-full top-10 left-10" />
            <div className="absolute w-64 h-64 bg-cyan-300/10 blur-[80px] rounded-full bottom-10 right-10" />
          </motion.div>

          {/* Soft moving water wave base */}
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 w-full h-48 bg-blue-400/20 blur-3xl"
          />

          {/* Main content */}
          <div className="relative z-10 text-white max-w-3xl px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">
              Aquaculture Insurance for a
              <span className="text-red-400"> Safer Future</span>
            </h1>

            <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md">
              Protect your ponds, fish stock, feeds, tanks, and infrastructure with
              <span className="font-semibold text-white"> AQUABIMA Insurance</span>.
              Designed for fish farmers who demand stability, safety, and guaranteed returns.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Insurable Perils */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-semibold text-[#157EBC] mb-6">
          Insurable Perils
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {perils.map((peril, idx) => (
            <Card
              key={idx}
              className="hover:scale-105 transition-transform duration-300 rounded-2xl shadow-lg border border-blue-100"
            >
              <CardBody className="flex flex-col items-center justify-center gap-3 py-6">
                {peril.icon}
                <span className="text-gray-800 font-semibold">
                  {peril.title}
                </span>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Key Benefits */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-semibold text-[#157EBC] mb-6">
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <Card
              key={idx}
              className="hover:scale-105 transition-transform duration-300 rounded-2xl shadow-lg"
            >
              <img
                alt={benefit.title}
                className="h-40 w-full object-cover rounded-t-xl"
                src={benefit.img}
              />
              <CardBody className="flex items-center gap-2">
                <CubeTransparentIcon className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-800">
                  {benefit.title}
                </span>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Species Covered */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-semibold text-[#157EBC] mb-6">
          Species Covered
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {speciesCovered.map((species, idx) => (
            <Card
              key={idx}
              className="hover:scale-105 transition-transform duration-300 rounded-2xl shadow-md"
            >
              <img
                alt={species.name}
                className="h-36 w-full object-cover rounded-t-xl"
                src={species.img}
              />
              <CardBody className="text-center font-medium text-gray-800">
                {species.name}
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Trust Badges & Stats */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-semibold text-[#157EBC] mb-8">
          Why Farmers Trust Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center shadow-lg rounded-2xl">
            <TrophyIcon className="w-10 h-10 text-yellow-500" />
            <p className="mt-3 text-gray-800 font-semibold">
              10+ Years Expertise
            </p>
          </Card>
          <Card className="p-6 flex flex-col items-center shadow-lg rounded-2xl">
            <GlobeAltIcon className="w-10 h-10 text-green-600" />
            <p className="mt-3 text-gray-800 font-semibold">
              5,000+ Farms Covered
            </p>
          </Card>
          <Card className="p-6 flex flex-col items-center shadow-lg rounded-2xl">
            <ClockIcon className="w-10 h-10 text-blue-600" />
            <p className="mt-3 text-gray-800 font-semibold">24/7 Support</p>
          </Card>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-12 text-center rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Secure Your Aquaculture Investment?
        </h2>
        <p className="text-blue-100 mb-6">
          Get in touch with us today and enjoy peace of mind while growing your
          fish farm.
        </p>
        <Button
          className="bg-white text-blue-700 font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-gray-100"
          onClick={() => setOpenModal(true)}
        >
          Get Covered Now
        </Button>
      </div>

      {/* Modal Form */}
      <Modal isOpen={openModal} size="md" onOpenChange={setOpenModal}>
        <ModalContent>
          <ModalHeader className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 text-white font-bold text-center">
            Aquaculture Insurance Request
          </ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Textarea
              fullWidth
              label="Your Request / Inquiry"
              name="request"
              rows={4}
              value={form.request}
              onChange={handleChange}
            />
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              color="secondary"
              className="bg-red-600 text-white hover:bg-red-500 font-semibold"
              onClick={() =>
                setForm({ name: "", email: "", phone: "", request: "" })
              }
            >
              Reset
            </Button>
            <Button
              color={success ? "success" : "primary"}
              disabled={loading || success}
              className="bg-blue-600 text-white hover:bg-blue-500 font-semibold"
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : success ? "Submitted!" : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
