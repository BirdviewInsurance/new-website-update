import React from "react";

import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
  return (
    <ProductTemplate
      benefits={[
        {
          title: "Accident medical benefits",
          desc: "Immediate hospitalization support and cash for recovery.",
        },
        {
          title: "Income replacement",
          desc: "Short-term weekly payment while recovering.",
        },
        {
          title: "Funeral support",
          desc: "Last expense benefit for driver’s beneficiaries.",
        },
      ]}
      claims={{
        heading: "Claims process for riders",
        paragraphs: [
          "Contact our boda desk, provide incident & medical reports. Fast-track claim lanes for members registered with partner groups.",
        ],
      }}
      coverages={[
        {
          heading: "Core benefits",
          paragraphs: [
            "Accident medical, temporary disability, funeral cover and optional legal assistance.",
          ],
        },
      ]}
      cta={{
        label: "Join the Welfare Scheme",
        href: "/Products/bodaboda-welfare/enroll",
      }}
      ctaSecondary={{
        label: "Member Benefits",
        href: "/Products/bodaboda-welfare/benefits",
      }}
      eligibility={{
        heading: "Membership",
        paragraphs: [
          "Open to licensed boda operators with a valid driver’s permit; group rates available through sacco or unions.",
        ],
      }}
      faqs={[
        {
          q: "Is gear cover included?",
          a: "Protective equipment cover is available as an add-on on selected plans.",
        },
      ]}
      heroImage="/images/bodaboda.jpg"
      heroKicker="Driver-first Protection"
      heroTagline="Affordable, practical cover built for boda drivers — accident benefits, hospital support and income protection."
      overview={{
        heading: "Designed for boda boda operators",
        paragraphs: [
          "A practical welfare product tailored to the needs of motorcycle taxi operators: quick claims, hospital cash and funeral support.",
        ],
      }}
      title="BodaBoda Welfare Cover"
    />
  );
}
