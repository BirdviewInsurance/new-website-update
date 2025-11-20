import React from "react";

import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
  return (
    <ProductTemplate
      benefits={[
        {
          title: "Daily Benefit",
          desc: "Receive a fixed cash amount for every night you stay in hospital.",
        },
        {
          title: "No receipts required",
          desc: "Cash is paid directly to the policyholder to use as needed.",
        },
        {
          title: "Stackable",
          desc: "Can be used alongside medical insurance for more comprehensive protection.",
        },
      ]}
      claims={{
        heading: "How to claim hospital cash",
        paragraphs: [
          "Submit admission & discharge summaries and hospital bill. Payments typically processed within 5–7 business days.",
        ],
      }}
      coverages={[
        {
          heading: "Core benefit",
          paragraphs: [
            "Daily cash payment per night of hospitalisation as per selected plan.",
          ],
        },
        {
          heading: "Add-ons",
          paragraphs: [
            "Optional surgical cash top-up and ICU multipliers available.",
          ],
        },
      ]}
      cta={{ label: "Compare Plans", href: "/products/hospital_cash/" }}
      ctaSecondary={{
        label: "Apply Now",
        href: "https://quote.birdviewinsurance.com/?ProductID=4",
      }}
      eligibility={{
        heading: "Who should choose this",
        paragraphs: [
          "Individuals who want a simple, low-cost buffer for incidental hospital costs and family support.",
        ],
      }}
      faqs={[
        {
          q: "Can I claim for pre-existing conditions?",
          a: "This depends on the plan; check the benefits schedule.",
        },
      ]}
      heroImage="/images/product-photos/hospital_cash.jpg"
      heroKicker="Daily Hospital Benefit"
      heroTagline="A simple daily cash payment while you’re admitted — helps with incidental costs not covered by medical insurance."
      overview={{
        heading: "Cash support for hospital stays",
        paragraphs: [
          "Hospital Cash provides a fixed daily benefit for each day of inpatient admission, helping cover travel, accommodation for family, and everyday expenses.",
        ],
      }}
      title="Hospital Cash"
    />
  );
}
