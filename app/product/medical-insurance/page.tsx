import React from "react";
import { Stethoscope } from "lucide-react";

import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
  return (
    <ProductTemplate
      benefits={[
        {
          title: "Large Hospital Network",
          desc: "Cashless treatment across partner hospitals countrywide.",
          icon: <Stethoscope />,
        },
        {
          title: "Flexible Plans",
          desc: "Multiple tiers to match budgets and health needs.",
        },
        {
          title: "Chronic Care Management",
          desc: "Support programs for diabetes, hypertension and other long-term conditions.",
        },
      ]}
      claims={{
        heading: "Claims & reimbursements",
        paragraphs: [
          "Cashless claims at network hospitals. Reimbursement available for private providers with supporting invoices.",
        ],
      }}
      coverages={[
        {
          heading: "In-patient cover",
          paragraphs: ["Hospitalisation, theatre, ICU and post-surgery care."],
          bullets: [
            "Room & board",
            "Surgical fees",
            "Medication & consumables",
          ],
        },
        {
          heading: "Out-patient options",
          paragraphs: [
            "Out-patient consultations, diagnostics and selected therapies available on selected plans.",
          ],
        },
      ]}
      crossSell={[
        {
          title: "Hospital Cash",
          href: "/Products/hospital-cash",
          desc: "Daily benefit for hospital stays.",
        },
      ]}
      cta={{
        label: "Request a Quote",
        href: "https://quote.birdviewinsurance.com/?ProductID=3",
      }}
      ctaSecondary={{
        label: "Find Hospitals",
        href: "/providers",
      }}
      eligibility={{
        heading: "Entry requirements",
        paragraphs: [
          "Standard underwriting applies. Waiting periods may apply for certain conditions, maternity and optical/dental benefits.",
        ],
      }}
      faqs={[
        {
          q: "Are pre-existing conditions covered?",
          a: "Some conditions may be covered after a waiting period — check your policy wording.",
        },
      ]}
      heroImage="/assets/productsPhotos/medical.png"
      heroKicker="Comprehensive Care"
      heroTagline="Personal, family and corporate medical plans with an extensive provider network and flexible benefits."
      overview={{
        heading: "Healthcare coverage built around your life",
        paragraphs: [
          "From routine consultations to major surgeries, our medical insurance plans cover essential and advanced medical needs with cashless hospitalisation at partner hospitals.",
          "Choose between individual, family and corporate packages with add-ons for maternity, dental and optical.",
        ],
      }}
      title="Medical Insurance"
    />
  );
}
