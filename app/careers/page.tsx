"use client";

import { Card, CardHeader, CardBody, Button, Badge } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, GraduationCap, PenLine } from "lucide-react";

export default function CareersPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const reasons = [
    {
      title: "Empowering Culture",
      desc: "We nurture an inclusive environment that values every voice, idea, and contribution.",
      icon: "/icons/team.svg",
    },
    {
      title: "Career Growth",
      desc: "Advance your career with continuous learning, mentorship, and clear growth paths.",
      icon: "/icons/growth.svg",
    },
    {
      title: "Meaningful Work",
      desc: "Make an impact through work that matters — protecting and improving lives.",
      icon: "/icons/impact.svg",
    },
    {
      title: "Competitive Benefits",
      desc: "We provide industry-leading packages that reward your hard work and dedication.",
      icon: "/icons/benefits.svg",
    },
  ];

  const positions = [
    {
      title: "Senior Underwriter",
      location: "Nairobi, Kenya",
      type: "Full-time",
      summary:
        "Lead the underwriting process, ensuring accuracy and compliance while supporting product innovation.",
    },
    {
      title: "Customer Experience Officer",
      location: "Nakuru, Kenya",
      type: "Full-time",
      summary:
        "Deliver top-tier customer support and ensure every client receives timely and professional assistance.",
    },
    {
      title: "Claims Analyst",
      location: "Remote (Kenya)",
      type: "Contract",
      summary:
        "Evaluate and process claims efficiently while upholding fairness and compliance with policy standards.",
    },
  ];

  const internships = [
    {
      title: "Actuarial Intern",
      duration: "3 months",
      description:
        "Support our actuarial team in data analysis, product modeling, and financial projections.",
    },
    {
      title: "Marketing Intern",
      duration: "6 months",
      description:
        "Assist in brand campaigns, digital outreach, and creative content to strengthen our presence.",
    },
    {
      title: "Tech & Innovation Intern",
      duration: "4 months",
      description:
        "Collaborate on internal tools and digital initiatives driving our transformation journey.",
    },
  ];

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* ✨ Animated Hybrid Background */}
      <svg
        className="absolute inset-0 -z-10 w-full h-full opacity-[0.15]"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15%" cy="30%" fill="#2563eb" r="80">
          <animate
            attributeName="cy"
            dur="6s"
            repeatCount="indefinite"
            values="30%;35%;30%"
          />
        </circle>
        <circle cx="85%" cy="60%" fill="#dc2626" r="100">
          <animate
            attributeName="cy"
            dur="8s"
            repeatCount="indefinite"
            values="60%;55%;60%"
          />
        </circle>
        <circle cx="50%" cy="85%" fill="#16a34a" r="70">
          <animate
            attributeName="cx"
            dur="7s"
            repeatCount="indefinite"
            values="50%;52%;50%"
          />
        </circle>
      </svg>

      {/* 🌟 Hero Section */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center bg-[url('/images/career-hero.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        {/* Beam Overlay */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-danger/30 opacity-50 blur-3xl"
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-white text-5xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
        >
          Careers at Birdview
        </motion.h1>
        <p className="relative z-10 text-white/80 mt-4 max-w-2xl">
          Build a meaningful career that shapes the future of insurance.
        </p>
      </section>

      {/* 💼 Why Work With Us */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-20"
        id="why-us"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-10 text-center text-gray-900 dark:text-gray-100">
          Why Work With Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              custom={i}
              initial="hidden"
              variants={fadeUp}
              whileInView="visible"
            >
              <Card className="flex flex-col justify-between h-full p-8 text-center border border-gray-200/60 dark:border-gray-800 bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] rounded-2xl transition-all duration-500">
                <CardHeader className="flex flex-col items-center">
                  <Image
                    alt={r.title}
                    className="mb-4"
                    height={64}
                    src={r.icon}
                    width={64}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {r.title}
                  </h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {r.desc}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🧑‍💼 Open Positions */}
      <motion.section
        className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-20 px-6"
        id="open-positions"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center flex items-center justify-center gap-3 text-gray-900 dark:text-gray-100">
            <Briefcase className="w-7 h-7 text-brand-blue" /> Open Positions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {positions.map((job, i) => (
              <motion.div
                key={job.title}
                custom={i}
                initial="hidden"
                variants={fadeUp}
                whileInView="visible"
              >
                <Card className="h-full p-6 border border-gray-200/60 dark:border-gray-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-md hover:shadow-2xl transition-all rounded-2xl">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="flex gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{job.location}</span> • <span>{job.type}</span>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      {job.summary}
                    </p>
                    <Button
                      className="group relative overflow-hidden rounded-full w-full text-white font-semibold transition-all duration-500 ease-out
                 before:absolute before:inset-0 before:bg-gradient-to-r before:from-danger before:to-danger before:z-0
                 before:translate-x-[-100%] before:transition-transform before:duration-500 group-hover:before:translate-x-0
                 after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary after:to-primary after:z-0
                 after:translate-x-0 after:transition-transform after:duration-500 group-hover:after:translate-x-[100%]"
                      color="primary"
                      variant="solid"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <motion.span
                          className="tracking-wide"
                          initial={{ x: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                          whileHover={{ x: 4 }}
                        >
                          Apply Now
                        </motion.span>

                        {/* Animated Icon */}
                        <motion.div
                          className="relative"
                          initial={{ rotate: 0, scale: 1 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                          whileHover={{
                            rotate: [0, -12, 12, 0],
                            scale: 1.15,
                          }}
                        >
                          <PenLine className="w-5 h-5 text-white" />
                          {/* Elegant Glow Effect */}
                          <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
                            className="absolute inset-0 rounded-full bg-white/40 blur-sm"
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                        </motion.div>
                      </span>
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🎓 Internships */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-20"
        id="internships"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-semibold mb-10 text-center flex items-center justify-center gap-3 text-gray-900 dark:text-gray-100">
          <GraduationCap className="w-7 h-7 text-brand-red" /> Internship
          Programs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {internships.map((intern, i) => (
            <motion.div
              key={intern.title}
              custom={i}
              initial="hidden"
              variants={fadeUp}
              whileInView="visible"
            >
              <Card className="flex flex-col justify-between h-full p-8 text-center border border-gray-200/60 dark:border-gray-800 bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] rounded-2xl transition-all duration-500">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {intern.title}
                  </h3>
                  <Badge className="mt-2" color="secondary">
                    {intern.duration}
                  </Badge>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                    {intern.description}
                  </p>
                  <Button
                    className="relative overflow-hidden rounded-full w-full font-semibold text-white transition-all duration-500 ease-out
                                                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-danger before:to-danger before:z-0
                                                    before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-0
                                                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary after:to-primary after:z-0
                                                    after:translate-x-0 after:transition-transform after:duration-500 hover:after:translate-x-[100%]"
                    color="danger"
                    variant="solid"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <motion.span
                        initial={{ x: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                        whileHover={{ x: 4 }}
                      >
                        Apply for Internship
                      </motion.span>

                      {/* Animated Icon */}
                      <motion.div
                        className="relative"
                        initial={{ y: 0, rotate: 0 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 1.5,
                        }}
                        whileHover={{
                          y: [-1, 2, -1],
                          rotate: [0, -10, 10, 0],
                        }}
                      >
                        <GraduationCap className="w-5 h-5 text-white" />
                        {/* Elegant glow highlight */}
                        <motion.div
                          animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
                          className="absolute inset-0 rounded-full bg-white/40 blur-sm"
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </motion.div>
                    </span>
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ready to take the next step? Join a team that’s transforming the
            future of insurance.
          </p>
          <Button
            className="group relative overflow-hidden rounded-full text-white font-semibold px-8 transition-all duration-500 ease-out
                 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:to-primary before:z-0
                 before:translate-x-[-100%] before:transition-transform before:duration-500 group-hover:before:translate-x-0
                 after:absolute after:inset-0 after:bg-gradient-to-r after:from-danger after:to-danger after:z-0
                 after:translate-x-0 after:transition-transform after:duration-500 group-hover:after:translate-x-[100%]"
            color="danger"
            size="lg"
            variant="solid"
          >
            <span className="relative z-10 flex items-center gap-2">
              <motion.span
                initial={{ x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileHover={{ x: 4 }}
              >
                View All Careers
              </motion.span>
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                whileHover={{
                  rotate: [0, 10, -10, 0],
                  scale: 1.1,
                }}
              >
                <Briefcase className="w-5 h-5 text-white" />
              </motion.div>
            </span>
          </Button>
        </div>
      </motion.section>
    </main>
  );
}
