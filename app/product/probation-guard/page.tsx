import React from "react";

import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
  return (
    <ProductTemplate
      benefits={[
        {
          title: "Legal assistance",
          desc: "Access to a legal advisory panel for covered events.",
        },
        {
          title: "Supervision support",
          desc: "Coordination with approved supervision providers.",
        },
        {
          title: "Liability cover",
          desc: "Selected liability cover for third-party incidents where applicable.",
        },
      ]}
      claims={{
        heading: "How it works",
        paragraphs: [
          "Notify our legal team for eligible incidents. Documentation required includes court notices and supervision reports.",
        ],
      }}
      coverages={[
        {
          heading: "Scope",
          paragraphs: [
            "Legal advisory services, limited bail support and counselling referrals; cover limits defined in the policy schedule.",
          ],
        },
      ]}
      cta={{ label: "Speak with a Specialist", href: "/contact-us" }}
      ctaSecondary={{
        label: "Request a Quote",
        href: "/products/probation_guard",
      }}
      eligibility={{
        heading: "Applies to",
        paragraphs: [
          "Individuals under supervised programs and organisations managing rehabilitation programs.",
        ],
      }}
      faqs={[
        {
          q: "Is bail guaranteed?",
          a: "Bail support is discretionary and subject to policy limits and underwriting.",
        },
      ]}
      heroImage="/assets/productsPhotos/prob_guard.png"
      heroKicker="Supervised Protection"
      heroTagline="A safeguard solution providing monitoring, legal assistance and limited liability cover for people on probation and related services."
      overview={{
        heading: "Specialised support for probation-related needs",
        paragraphs: [
          "Probation Guard blends legal assistance, bail support and specific liability cover where appropriate. Ideal for individuals and organisations that support probationers during rehabilitation.",
        ],
      }}
      title="Probation Guard"
    />
  );
}
