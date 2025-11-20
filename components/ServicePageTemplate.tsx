"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  ctaText: string;
  ctaHref: string;
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  title,
  subtitle,
  description,
  features,
  imageSrc,
  ctaText,
  ctaHref,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-primary mb-4">{title}</h1>
        <p className="text-xl text-gray-700 mb-8">{subtitle}</p>
        <Image
          alt={title}
          className="rounded-xl shadow-lg mx-auto"
          height={400}
          src={imageSrc}
          width={800}
        />
      </motion.div>

      {/* Description & Features */}
      <motion.div
        animate={{ opacity: 1 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <p className="text-lg text-gray-600 mb-6">{description}</p>
          <ul className="list-disc list-inside space-y-2">
            {features.map((feat, i) => (
              <li key={i} className="text-gray-700 font-medium">
                {feat}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            alt={title}
            className="rounded-xl shadow-md mb-6"
            height={300}
            src={imageSrc}
            width={500}
          />
          <Button
            as="a"
            className="border-white text-white hover:bg-red-500 font-medium px-8 py-3 rounded-xl"
            color="primary"
            href={ctaHref}
            size="lg"
            variant="solid"
          >
            {ctaText}
          </Button>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 text-center bg-primary/10 p-12 rounded-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.6 }}
      >
        {/* Background Image */}
        <img
          alt="CTA Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-xl"
          src="/images/cta-banner.png"
        />

        {/* Overlay Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Protect Yourself?
          </h2>
          <p className="text-gray-700 mb-6">
            Get in touch with our team today and customize your insurance plan.
          </p>
          <Button
            as="a"
            className="border-white text-white hover:bg-red-500 font-medium px-8 py-3 rounded-xl"
            color="primary"
            href={ctaHref}
            size="lg"
            variant="solid"
          >
            {ctaText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
