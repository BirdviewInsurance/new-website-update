import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function RepatriationPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Arrange Repatriation"
      description="We ensure safe and dignified repatriation of loved ones to their home country, handling all logistics and documentation with care and professionalism."
      features={[
        "Comprehensive documentation support",
        "International coordination with airlines and authorities",
        "24/7 support to families",
        "Swift, respectful transport of remains",
        "Customizable corporate and personal plans",
      ]}
      imageSrc="/images/evacuation-repatriation.jpg"
      subtitle="Dignified & Respectful Services"
      title="Repatriation of Remains"
    />
  );
}
