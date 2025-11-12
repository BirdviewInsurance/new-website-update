"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { allLeaders } from "../data/leaders";

type Leader = typeof allLeaders[0];

export default function LeaderProfilePage() {
  const params = useParams<{ slug: string }>();
  const [leader, setLeader] = useState<Leader | null>(null);

  useEffect(() => {
    if (params?.slug) {
      const found = allLeaders.find((l) => l.slug === params.slug);
      setLeader(found ?? null);
    }
  }, [params?.slug]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  if (!leader) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white text-xl">
        Leader not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-800 dark:text-white transition-colors duration-700">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/40 to-red-600/30 rounded-full blur-3xl opacity-60"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-10 right-1/3 w-96 h-96 bg-gradient-to-r from-red-600/30 to-blue-500/30 rounded-full blur-3xl opacity-50"
        style={{ y: y2 }}
      />

      {/* Leader Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-16"
      >
        <Card className="max-w-3xl w-full backdrop-blur-2xl bg-white/60 dark:bg-white/10 border border-gray-200/60 dark:border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="relative w-full h-80 md:h-96 overflow-hidden flex justify-center items-center bg-gradient-to-b from-gray-100 dark:from-gray-900">
            <Image
              src={leader.image}
              alt={leader.name}
              width={500}
              height={500}
              className="object-contain rounded-3xl"
              priority
            />
          </CardHeader>
          <CardBody className="p-8 space-y-4 text-center">
            <h1 className="text-3xl font-bold">{leader.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{leader.role}</p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{leader.bio}</p>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-2">{leader.cta.title}</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{leader.cta.text}</p>
              <Link
                href={leader.cta.link}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition-all"
              >
                {leader.cta.button}
                <ArrowRight size={18} />
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Back to Leadership */}
        <Link
          href="/our-leadership"
          className="mt-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline transition-all"
        >
          <ArrowLeft size={18} /> Back to Leadership
        </Link>
      </motion.div>
    </div>
  );
}
