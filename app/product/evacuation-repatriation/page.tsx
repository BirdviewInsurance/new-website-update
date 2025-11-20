"use client";

import React from "react";
import { motion } from "framer-motion";
import { Airplay, Globe2 } from "lucide-react";

import ProductTemplate from "../components/ProductTemplate";

// Animation variants for scroll-in effects
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Page() {
  return (
    <motion.div
      className="overflow-hidden"
      initial="hidden"
      viewport={{ once: true, amount: 0.1 }}
      whileInView="visible"
    >
      <ProductTemplate
        benefits={[
          {
            title: "24/7 Global Response",
            desc: "Dedicated emergency desk available around the clock to coordinate evacuations.",
            icon: (
              <motion.div
                transition={{ type: "spring", stiffness: 300 }}
                variants={fadeInUp}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <Globe2 className="w-6 h-6 text-primary" />
              </motion.div>
            ),
          },
          {
            title: "Full Medical Escort",
            desc: "Critical care nurses or physicians accompany you during transfers when required.",
            icon: (
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.15, rotate: -5 }}
              >
                <Airplay className="w-6 h-6 text-danger" />
              </motion.div>
            ),
          },
          {
            title: "Family Repatriation Support",
            desc: "We assist with travel and accommodation for immediate family when repatriation is needed.",
            icon: (
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.15 }}>
                <Airplay className="w-6 h-6 text-amber-500" />
              </motion.div>
            ),
          },
        ]}
        claims={{
          heading: "How to file an evacuation claim",
          paragraphs: [
            "Contact our emergency desk immediately via the number on your policy card. Our team will coordinate logistics and file required documentation on your behalf.",
          ],
          bullets: [
            "Call emergency desk (24/7)",
            "Submit medical reports and incident forms",
            "Claim handler will advise next steps",
          ],
        }}
        coverages={[
          {
            heading: "What's covered",
            paragraphs: [
              "Emergency air ambulance transport to the nearest appropriate facility or repatriation to home country when medically necessary.",
            ],
            bullets: [
              "Air ambulance and stretcher flights",
              "Ground ambulance & hospital transfers",
              "Medical escort staff and ventilator support if needed",
            ],
          },
          {
            heading: "Limits & conditions",
            paragraphs: [
              "Coverage depends on plan tier. Pre-existing conditions may have waiting periods — consult policy terms for specific exclusions.",
            ],
          },
        ]}
        crossSell={[
          {
            title: "Medical Insurance",
            href: "/Products/medical-insurance",
            desc: "Comprehensive medical & hospital cover.",
          },
          {
            title: "Travel Add-ons",
            href: "/Products/travel-addons",
            desc: "Trip cancellation and baggage protection.",
          },
        ]}
        cta={{
          label: "Request Emergency Assistance",
          href: "/contact-us",
        }}
        ctaSecondary={{
          label: "Get a Quote",
          href: "https://quote.birdviewinsurance.com/?ProductID=1",
        }}
        eligibility={{
          heading: "Eligible members",
          paragraphs: [
            "Individuals and families with active Evacuation add-on in their policy. Corporate travellers can be covered under corporate packages.",
          ],
          bullets: [
            "Active policy at time of incident",
            "Coverage varies by plan tier",
          ],
        }}
        faqs={[
          {
            q: "Is evacuation covered for pre-existing conditions?",
            a: "Pre-existing conditions may be excluded or require waiting periods — review your policy schedule or speak with our advisors.",
          },
          {
            q: "How fast can an air ambulance be arranged?",
            a: "We typically mobilize the nearest available resource within hours depending on location and medical needs.",
          },
        ]}
        heroImage="/assets/productsPhotos/Evacuation-and-Repatriation.png"
        heroKicker="Crisis & Travel Support"
        heroTagline="Rapid medical evacuation and dignified repatriation worldwide — when time matters most."
        overview={{
          heading: "Critical transport when ordinary options aren’t enough",
          paragraphs: [
            "Our Evacuation & Repatriation product coordinates medical transport, arranging flights, medical teams, and receiving family support. We cover both emergency air ambulance and dignified repatriation for eligible events.",
            "We partner with accredited medical evacuation providers globally so you receive immediate, professional care and safe transport home or to specialized facilities.",
          ],
        }}
        title="Evacuation & Repatriation"
      />
    </motion.div>
  );
}
