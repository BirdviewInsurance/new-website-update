import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function FuneralExpensePage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Get Funeral Cover"
      description="Our Funeral Expense Cover ensures that your loved ones are supported financially during difficult times, covering all funeral-related expenses."
      features={[
        "Comprehensive funeral cost coverage",
        "Assistance with funeral arrangements",
        "24/7 family support hotline",
        "Flexible individual and corporate plans",
        "Fast claim processing",
      ]}
      imageSrc="/images/last-expense-funeral.jpg"
      subtitle="Financial Peace of Mind for Your Family"
      title="Funeral Expense Cover"
    />
  );
}
