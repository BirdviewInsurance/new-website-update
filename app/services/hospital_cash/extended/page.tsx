import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function ExtendedStayPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/hospital_cash"
      ctaText="Get Extended Coverage"
      description="Our Extended Stay Benefit covers prolonged hospitalizations, ensuring that you or your loved ones have financial support for extended treatment periods."
      features={[
        "Extended cash payouts for long-term hospitalization",
        "Covers additional medical and personal expenses",
        "Quick claim processing for peace of mind",
        "Flexible coverage for individuals and corporate clients",
        "Support throughout your recovery journey",
      ]}
      imageSrc="/images/hospital-extended.jpg"
      subtitle="Financial Relief for Longer Hospital Stays"
      title="Extended Stay Benefit"
    />
  );
}
