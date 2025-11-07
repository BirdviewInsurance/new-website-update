"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { ShieldCheck, Users2 } from "lucide-react";

type Benefit = { title: string; desc: string; icon?: React.ReactNode };
type Section = { heading: string; paragraphs: string[]; bullets?: string[] };

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function ProductTemplate({
  title,
  heroTagline,
  heroKicker,
  heroImage,
  overview,
  benefits,
  coverages,
  eligibility,
  claims,
  faqs,
  cta,
  ctaSecondary,
  crossSell,
}: {
  title: string;
  heroTagline?: string;
  heroKicker?: string;
  heroImage?: string;
  overview: Section;
  benefits: Benefit[];
  coverages: Section[];
  eligibility: Section;
  claims: Section;
  faqs: { q: string; a: string }[];
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  crossSell?: { title: string; href: string; desc?: string }[];
}) {
  return (
    <article className="prose prose-slate max-w-6xl mx-auto py-12 px-6 overflow-hidden">
      {/* HERO */}
      <motion.header
        className="rounded-xl overflow-hidden bg-gradient-to-r from-primary-100 via-white to-danger-50 shadow-lg border border-primary/10"
        initial="hidden"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="grid md:grid-cols-2 gap-6 p-8 items-center">
          <motion.div variants={fadeInUp}>
            <p className="text-sm uppercase text-primary font-semibold tracking-wide">
              {heroKicker}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
              {title}
            </h1>
            {heroTagline && (
              <p className="mt-3 text-lg text-slate-700">{heroTagline}</p>
            )}

            <motion.div className="flex gap-3 mt-6" variants={fadeInUp}>
              <Button
                as="a"
                className="shadow-lg bg-primary text-white hover:bg-primary/90 transition-all"
                href={cta.href}
              >
                {cta.label}
              </Button>
              {ctaSecondary && (
                <Button
                  as="a"
                  className="bg-danger text-white hover:bg-danger/90 transition-all"
                  href={ctaSecondary.href}
                  variant="solid"
                >
                  {ctaSecondary.label}
                </Button>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="w-full max-w-md">
              <div className="w-full h-56 md:h-64 rounded-lg bg-gradient-to-tr from-primary/10 to-danger/10 flex items-center justify-center">
                {heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={`${title} hero`}
                    className="object-cover w-full h-full rounded-lg shadow-md"
                    src={heroImage}
                  />
                ) : (
                  <div className="text-slate-400">Image placeholder</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* OVERVIEW */}
      <motion.section
        className="mt-10 grid lg:grid-cols-3 gap-8"
        initial="hidden"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-primary-700">
            {overview.heading}
          </h2>
          {overview.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="mt-4 text-slate-700 leading-relaxed"
              custom={i}
              variants={fadeInUp}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.aside className="space-y-4" variants={fadeInUp}>
          <Card className="p-5 shadow-lg hover:shadow-xl bg-gradient-to-r from-primary-50 via-white to-primary-100 border-l-4 border-primary-500 transition">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-semibold text-primary-700">
                  Why choose us?
                </h3>
                <p className="text-sm text-slate-700 mt-1">
                  Trusted by thousands, responsive claims, and a swift
                  repatriation network across the globe.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 shadow-md hover:shadow-xl bg-gradient-to-r from-danger-50 via-white to-danger-100 border-l-4 border-danger-500 transition">
            <h3 className="font-semibold text-danger-700">Quick actions</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="underline hover:text-danger-600"
                  href="/Claims/process"
                >
                  How claims work
                </a>
              </li>
              <li>
                <a className="underline hover:text-danger-600" href="/Contact">
                  Contact support
                </a>
              </li>
              <li>
                <a className="underline hover:text-danger-600" href="/Products">
                  Explore other covers
                </a>
              </li>
            </ul>
          </Card>
        </motion.aside>
      </motion.section>

      {/* BENEFITS */}
      <motion.section
        className="mt-16"
        initial="hidden"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        <h3 className="text-2xl font-semibold text-primary-700">
          Key benefits
        </h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl bg-gradient-to-br from-white via-slate-50 to-primary-50 border shadow-sm hover:shadow-lg hover:border-primary-400 transition"
              custom={i}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary-100">
                  {b.icon ?? <Users2 className="w-6 h-6 text-primary-600" />}
                </div>
                <div>
                  <h4 className="font-semibold text-primary-700">{b.title}</h4>
                  <p className="text-sm text-slate-700 mt-1">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* COVERAGES */}
      <motion.section
        className="mt-16"
        initial="hidden"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <h3 className="text-2xl font-semibold text-primary-700">
          Coverage details
        </h3>
        <div className="mt-6 space-y-6">
          {coverages.map((c, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg p-5 bg-gradient-to-r from-white via-slate-50 to-primary-50 border border-slate-200 shadow-sm hover:shadow-md transition"
              custom={idx}
              variants={fadeInUp}
            >
              <h4 className="font-semibold text-primary-700">{c.heading}</h4>
              {c.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-slate-700 mt-2">
                  {p}
                </p>
              ))}
              {c.bullets && (
                <ul className="list-disc list-inside mt-3 text-sm text-slate-700">
                  {c.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ELIGIBILITY / CLAIMS */}
      <motion.section
        className="mt-16 grid md:grid-cols-2 gap-8"
        initial="hidden"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div variants={fadeInUp}>
          <h3 className="text-lg font-semibold text-primary-700">
            Who it’s for
          </h3>
          <div className="mt-4 rounded-lg p-5 bg-gradient-to-r from-primary-50 via-white to-primary-100 border-l-4 border-primary-500 shadow-sm">
            <h4 className="font-medium text-primary-700">
              {eligibility.heading}
            </h4>
            {eligibility.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-slate-700 mt-2">
                {p}
              </p>
            ))}
            {eligibility.bullets && (
              <ul className="mt-3 list-disc list-inside text-sm text-slate-700">
                {eligibility.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <h3 className="text-lg font-semibold text-danger-700">
            Claims & support
          </h3>
          <div className="mt-4 rounded-lg p-5 bg-gradient-to-r from-danger-50 via-white to-danger-100 border-l-4 border-danger-500 shadow-sm">
            <h4 className="font-medium text-danger-700">{claims.heading}</h4>
            {claims.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-slate-700 mt-2">
                {p}
              </p>
            ))}
            {claims.bullets && (
              <ul className="mt-3 list-disc list-inside text-sm text-slate-700">
                {claims.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex gap-3">
              <a
                className="underline text-sm text-danger-700 hover:text-danger-600"
                href="/Claims/forms"
              >
                Download claim forms
              </a>
              <a
                className="underline text-sm text-danger-700 hover:text-danger-600"
                href="/Claims/contact"
              >
                Contact claims team
              </a>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="mt-10 bg-gradient-to-r from-primary/10 via-white to-danger/10 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 shadow-md border border-primary/20"
        initial="hidden"
        variants={fadeInUp}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div variants={fadeInUp}>
          <h3 className="text-lg font-semibold text-slate-800">
            Ready to protect what matters?
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Get a tailored plan in minutes.
          </p>
        </motion.div>
        <motion.div className="flex gap-3" variants={fadeInUp}>
          <a
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium shadow hover:bg-primary/90 transition-all"
            href={cta.href}
          >
            {cta.label}
          </a>
          {ctaSecondary && (
            <a
              className="px-5 py-2.5 rounded-lg bg-danger text-white font-medium shadow hover:bg-danger/90 transition-all"
              href={ctaSecondary.href}
            >
              {ctaSecondary.label}
            </a>
          )}
        </motion.div>
      </motion.section>
    </article>
  );
}
