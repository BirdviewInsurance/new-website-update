import React from "react";
import { HeartPulse } from "lucide-react";

import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
  return (
    <ProductTemplate
      benefits={[
        {
          title: "Quick Payouts",
          desc: "Fast claims turnaround to support families without delay.",
          icon: <HeartPulse />,
        },
        {
          title: "Fixed Premiums",
          desc: "Affordable monthly or annual payments with no hidden costs.",
        },
        {
          title: "Family Add-ons",
          desc: "Option to add spouse or dependants at discounted rates.",
        },
      ]}
      claims={{
        heading: "Submitting a Last Expense claim",
        paragraphs: [
          "Submit the death certificate, beneficiary ID, and funeral invoice. We aim to process straightforward claims within 3–7 business days.",
        ],
      }}
      coverages={[
        {
          heading: "Typical coverage",
          paragraphs: [
            "Lump sum for funeral, mortuary and basic repatriation of remains where applicable.",
          ],
          bullets: [
            "Funeral services",
            "Coffin and transport",
            "Basic repatriation costs (plan dependent)",
          ],
        },
      ]}
      crossSell={[
        {
          title: "Personal Accident",
          href: "/Products/personal-accident",
          desc: "Additional accidental death benefits.",
        },
      ]}
      cta={{
        label: "Enroll Now — Protect Your Family",
        href: "/Products/last-expense/enroll",
      }}
      ctaSecondary={{
        label: "See Plans & Pricing",
        href: "/Products/last-expense/pricing",
      }}
      eligibility={{
        heading: "Who can apply",
        paragraphs: [
          "Adults aged 18–75 (age limits vary by plan). Immediate enrolment for those who meet underwriting criteria.",
        ],
      }}
      faqs={[
        {
          q: "Can I add my children?",
          a: "Yes — dependent children can be added under family options. See plan schedule for details.",
        },
      ]}
      heroImage="/images/last-expense-hero.jpg"
      heroKicker="Funeral & Final Costs"
      heroTagline="Financial peace of mind for final expenses — simple plans that protect families from unexpected funeral bills."
      overview={{
        heading: "Cover funeral costs and immediate post-death expenses",
        paragraphs: [
          "Last Expense cover provides a lump-sum payout to beneficiaries to help cover funeral costs, repatriation, and administrative expenses.",
          "Our plans are designed to be affordable with quick payout options for families at a difficult time.",
        ],
      }}
      title="Last Expense"
    />
  );
}
