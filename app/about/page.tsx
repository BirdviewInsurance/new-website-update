"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/public/images/logo1.png";
import { title } from "@/components/primitives";

export default function AboutPage() {
  const objectives = [
    {
      title: "Accessibility",
      content:
        "We make insurance products easily accessible to all Kenyans, including those in remote areas and the diaspora, via digital platforms and strategic channels.",
    },
    {
      title: "Affordability",
      content:
        "Our products are cost-effective, ensuring everyone can access financial protection without financial strain.",
    },
    {
      title: "Innovation",
      content:
        "We leverage AI, data analytics, and innovative solutions to enhance efficiency, claims processing, and customer experience.",
    },
    {
      title: "Customer-Centricity",
      content:
        "Our services prioritize customers, offering personalized support, transparent communication, and timely claims resolution.",
    },
    {
      title: "Market Leadership",
      content:
        "Birdview Insurance sets industry standards in Kenya, delivering excellence, trust, and social impact in the insurance sector.",
    },
    {
      title: "Community Focus",
      content:
        "We actively engage with communities to educate, protect, and empower individuals and families for a secure future.",
    },
  ];

  const benefits = [
    "24/7 Emergency Assistance and Evacuation Support",
    "Tailored Insurance Solutions for Kenyans at Home and Abroad",
    "Trusted Partnerships with Medical and Transport Providers",
    "Fast and Seamless Claims Processing",
    "Affordable Plans Without Compromising Coverage",
    "Reliable Financial Security and Peace of Mind",
    "Dedicated Customer Service and Guidance",
  ];

  return (
    <div className="space-y-32 w-full overflow-x-hidden">

      {/* Hero Section with CTA */}
      <section
        className="relative w-full bg-gradient-to-r from-primary/30 via-white/80 to-primary/20 py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/backdrop2.jpg')", // 🖼️ Replace with your actual image path
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/50 via-white/30 to-red-600/40 backdrop-blur-sm -z-10"></div>

        {/* Decorative top skew */}
        <div className="absolute top-0 left-0 w-full h-64 bg-primary/10 -skew-y-3 origin-top-left -z-10"></div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white max-w-4xl">
            About Birdview Insurance
          </h1>

          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
            Birdview Insurance is a Kenyan diaspora-driven initiative providing essential financial
            security to Kenyans both locally and globally. We offer professional, affordable, and
            compassionate solutions in evacuation, medical insurance, and last expense services —
            ensuring help is available, reliable, and dignified when crisis strikes.
          </p>

          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <Link
              href="/get-quote"
              className="px-6 py-3 rounded-full border bg-primary border-danger text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border bg-danger border-primary text-white font-semibold hover:bg-primary hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full bg-white py-24 relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-semibold text-primary border-l-4 border-primary pl-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Birdview Insurance was founded to address the urgent challenges faced by families during
              medical emergencies, cross-border crises, and end-of-life arrangements. Too often,
              Kenyans face overwhelming logistical and financial burdens without a reliable guide.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By partnering with trusted medical, transport, and diplomatic organizations, we ensure
              families receive fast, seamless, and dignified support, reducing stress during critical times.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 relative w-full h-80 md:h-96 -mr-6 md:-mr-12 rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/faq-bg.png" alt="Our Story" fill className="object-cover" />
          </div>
        </div>

        {/* Optional Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-r from-primary/10 to-transparent"></div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full py-24 bg-gray-50 px-6">
        <h2 className="text-4xl font-semibold text-primary border-l-4 border-primary pl-4 mb-12 text-center md:text-left">
          Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card shadow="lg" className="transition-transform hover:shadow-xl hover:-translate-y-2 p-6 rounded-xl">
            <CardHeader>
              <h3 className="text-xl font-semibold">Our Mission</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 leading-relaxed">
                To provide accessible, affordable, and comprehensive insurance solutions to Kenyans
                locally and abroad, ensuring peace of mind and financial security in times of need.
              </p>
            </CardBody>
          </Card>

          <Card shadow="lg" className="transition-transform hover:shadow-xl hover:-translate-y-2 p-6 rounded-xl">
            <CardHeader>
              <h3 className="text-xl font-semibold">Our Vision</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 leading-relaxed">
                To be the leading provider of insurance solutions in Kenya, recognized for customer
                satisfaction, innovation, and social responsibility, extending our reach to Kenyan
                communities globally.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Core Objectives Section */}
      <section className="w-full py-24 px-6 bg-white">
        <h2 className="text-4xl font-semibold text-primary border-l-4 border-primary pl-4 mb-12 text-center md:text-left">Core Objectives</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {objectives.map((obj, idx) => (
            <Card key={idx} shadow="md" className="transition-transform hover:shadow-xl hover:-translate-y-2 p-6 rounded-xl">
              <CardHeader>
                <h4 className="font-semibold text-lg text-primary">{obj.title}</h4>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed">{obj.content}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-24 bg-gray-50 px-6">
        <h2 className="text-4xl font-semibold text-primary border-l-4 border-primary pl-4 mb-12 text-center md:text-left">Why Choose Birdview?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">{i + 1}</span>
              </div>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Section with CTA */}
      <section className="w-full py-32 bg-gradient-to-r from-primary/20 to-primary/10 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-6">Committed to Serving You</h2>
        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          At Birdview Insurance, we are dedicated to providing timely, compassionate, and professional
          support during critical moments. More than just insurance, we are your trusted partner
          for financial security and peace of mind.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/get-quote" className="px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:scale-105 transition">
            Get a Quote
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition">
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
}
