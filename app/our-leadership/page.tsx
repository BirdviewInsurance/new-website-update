"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader } from "@heroui/react";
import { Briefcase, Users2, Star, Globe2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OurLeadership() {
  const router = useRouter();
  const makeSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  const board = [
    {
      name: "Geoffery Kangwana",
      title: "Chairman - Board Of Directors",
      img: "/assets/managementPhotos/Geoffrey-Kangwana.png",
    },
    {
      name: "Richard Muiru",
      title: "Director",
      img: "/assets/managementPhotos/Richard-Muiru.png",
    },
    {
      name: "James Kimani",
      title: "Director",
      img: "/assets/managementPhotos/James-Kimani.png",
    },
    {
      name: "Obed Menjeri",
      title: "Director",
      img: "/assets/managementPhotos/Obed-Menjeri.png",
    },
    {
      name: "James Nyakundi",
      title: "Director",
      img: "/assets/managementPhotos/James-Nyakundi.png",
    },
  ];

  const executives = [
    {
      name: "Rodgers Moindi",
      title: "Chief Executive Officer",
      img: "/assets/managementPhotos/Rodgers-Moindi.png",
    },
    {
      name: "Mary Mundia",
      title: "Finance Manager",
      img: "/assets/managementPhotos/Mary-Mundia.png",
    },
    {
      name: "Obed Menjeri",
      title: "Business Development Manager",
      img: "/assets/managementPhotos/Obed-Menjeri.png",
    },
    {
      name: "Esdor Yahuma",
      title: "Assistant Business Development Manager",
      img: "/assets/managementPhotos/Esdor-Yahuma.png",
    },
    {
      name: "Kevin Osiga",
      title: "Underwriting Manager",
      img: "/assets/managementPhotos/Kevin-Osiga.png",
    },
    {
      name: "Ann Kinyanjui",
      title: "Diaspora Business Development Manager",
      img: "/assets/managementPhotos/Ann-Kinyanjui.png",
    },
  ];

  const advisors = [
    {
      name: "Dr. Alice Oloo",
      title: "Senior Strategic Advisor",
      img: "/assets/managementPhotos/Richard-Muiru.png",
    },
    {
      name: "John Mwangi",
      title: "Financial Consultant",
      img: "/assets/managementPhotos/Obed-Menjeri.png",
    },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-6 md:px-12 lg:px-24 py-20 space-y-28 transition-colors duration-700">
      {/* 🪶 Floating Background Gradient Lights */}
      <motion.div
        animate={{ y: [0, 40, 0] }}
        className="absolute -top-40 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-blue-600/30 via-cyan-400/20 to-red-600/20 rounded-full blur-[140px]"
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ y: [0, -40, 0] }}
        className="absolute bottom-0 right-1/3 w-[26rem] h-[26rem] bg-gradient-to-r from-red-600/30 to-orange-400/20 rounded-full blur-[120px]"
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ✨ Hero Section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-5 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          Our Leadership
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Visionary leaders shaping a future of integrity, innovation, and
          enduring impact — committed to people, progress, and purpose.
        </p>
      </motion.div>

      {/* 🌟 Sections */}
      {[
        {
          id: "board",
          title: "Board of Directors",
          icon: <Briefcase className="text-blue-600 w-8 h-8" />,
          data: board,
        },
        {
          id: "executive",
          title: "Executive Team",
          icon: <Users2 className="text-red-600 w-8 h-8" />,
          data: executives,
        },
        {
          id: "advisors",
          title: "Strategic Advisors",
          icon: <Star className="text-blue-600 w-8 h-8" />,
          data: advisors,
        },
      ].map((section, sIdx) => (
        <motion.div
          key={section.id}
          className="space-y-12"
          id={section.id}
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: sIdx * 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 justify-center">
            {section.icon}
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white tracking-tight">
              {section.title}
            </h2>
          </div>

          <div
            className={`grid gap-10 ${
              section.id === "advisors"
                ? "md:grid-cols-2 max-w-4xl mx-auto"
                : "md:grid-cols-3"
            }`}
          >
            {section.data.map((person, i) => (
              <motion.div
                key={i}
                className="cursor-pointer group"
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() =>
                  router.push(`/our-leadership/${makeSlug(person.name)}`)
                }
              >
                <Card className="overflow-hidden relative border border-gray-200/60 dark:border-gray-800/70 bg-white/70 dark:bg-gray-900/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.2)] transition-all duration-700 rounded-3xl">
                  {/* 🖼 Portrait Image */}
                  <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-t from-white/5 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <Image
                      alt={person.name}
                      className="object-contain w-full h-80 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                      height={500}
                      src={person.img}
                      width={500}
                    />
                    {/* ✴️ Motion Gradient Overlay */}
                    <motion.div
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-red-500/20 to-blue-600/30 bg-[length:200%_200%] opacity-0 group-hover:opacity-80 transition-opacity duration-700 mix-blend-overlay"
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <p className="text-white text-sm font-semibold tracking-wider uppercase">
                        View Profile →
                      </p>
                    </div>
                  </div>

                  {/* 🧾 Card Header */}
                  <CardHeader className="text-center pt-6 pb-8 relative">
                    <div className="inline-block relative">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                        {person.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                        {person.title}
                      </p>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-red-600 group-hover:w-full transition-all duration-500 ease-in-out" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* 🌍 Values Section */}
      <motion.div
        className="text-center space-y-6 mt-32 max-w-3xl mx-auto"
        id="values"
        initial={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Globe2 className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Our Values
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          We believe in integrity, inclusivity, and innovation — cultivating a
          culture where every decision uplifts people and strengthens our shared
          future.
        </p>
      </motion.div>
    </section>
  );
}
