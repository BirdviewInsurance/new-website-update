"use client";

import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { allLeaders } from "@/app/data/leaders";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface Params {
  params: Promise<{ slug: string }>;
}

// Fetch leader by slug
const getLeaderBySlug = (slug: string) => {
  return allLeaders.find((leader) => leader.slug === slug);
};

export default function InsightPage({ params }: Params) {
  // Use React.use() to unwrap the params Promise
  const { slug } = React.use(params);

  const leader = getLeaderBySlug(slug);

  if (!leader) {
    return notFound();
  }

  const { name, image, cta } = leader;

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={name}
            width={250}
            height={250}
            className="rounded-xl object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            {cta.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{cta.text}</p>
          <Button
            size="lg"
            variant="solid"
            className="mt-4 bg-gradient-to-r from-blue-600 to-red-500 text-white text-lg font-medium flex items-center gap-2"
            onClick={() => (window.location.href = cta.link)}
          >
            <motion.div
              className="flex"
              initial="rest"
              whileHover="hover"
              variants={{
                rest: { x: 0 },
                hover: { x: -6 },
              }}
            >
              <ArrowLeft className="w-5 h-5 font-bold" />
            </motion.div>
            {cta.button}
          </Button>
        </div>
      </div>
    </main>
  );
}
