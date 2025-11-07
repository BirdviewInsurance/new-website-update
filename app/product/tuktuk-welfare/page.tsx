import React from "react";

import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
  return (
    <ProductTemplate
      benefits={[
        {
          title: "Passenger liability option",
          desc: "Optional cover for passenger injury claims.",
        },
        {
          title: "Hospital support",
          desc: "Daily cash during admission and medical expense reimbursement.",
        },
        {
          title: "Fast claims",
          desc: "Dedicated claims line and expedited payout.",
        },
      ]}
      claims={{
        heading: "Claim guide",
        paragraphs: [
          "Report incidents within 72 hours, submit police & medical reports for passenger injury cases.",
        ],
      }}
      coverages={[
        {
          heading: "Core",
          paragraphs: [
            "Personal injury, hospital cash and optional passenger liability.",
          ],
        },
      ]}
      cta={{
        label: "Apply for TukTuk Cover",
        href: "/Products/tuktuk-welfare/apply",
      }}
      ctaSecondary={{
        label: "View Membership Options",
        href: "/Products/tuktuk-welfare/membership",
      }}
      eligibility={{
        heading: "Who can apply",
        paragraphs: [
          "Licensed tuk-tuk drivers and vehicle owners; group discounts for associations.",
        ],
      }}
      faqs={[
        {
          q: "Does it cover theft?",
          a: "The welfare product focuses on personal injury and hospital support; comprehensive motor insurance is recommended for theft/vehicle damage.",
        },
      ]}
      heroImage="/images/tuktuk.jpg"
      heroKicker="For TukTuk Drivers & Owners"
      heroTagline="Simplified welfare policies for three-wheeler operators — injury cover, hospital support and quick claims."
      overview={{
        heading: "Affordable protection for tuk-tuk operators",
        paragraphs: [
          "Cover designed for the unique needs of tuk-tuk drivers, including passenger liabilities and income support during recovery.",
        ],
      }}
      title="TukTuk Welfare Cover"
    />
  );
}
