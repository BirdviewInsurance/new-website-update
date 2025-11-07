import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function JobRiskProtectionPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Get Job Risk Protection"
      description="Our Job Risk Protection plan ensures financial security for individuals on probation or new employment, protecting against unforeseen employment-related risks."
      features={[
        "Compensation for employment-related risks",
        "Coverage for temporary disability or income loss",
        "Guidance and support during probation periods",
        "Quick claims and assistance",
        "Flexible individual and corporate plans",
      ]}
      imageSrc="/images/probation-job.jpg"
      subtitle="Safeguarding Your Career & Income"
      title="Job Risk Protection"
    />
  );
}
