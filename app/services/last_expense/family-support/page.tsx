// /app/services/last-expense/family-support/page.tsx
import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function FamilySupportPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Secure Family Support"
      description="Ensure your family’s welfare in unforeseen circumstances with our Family Support Cover, providing financial assistance for everyday needs and emergencies."
      features={[
        "Monthly or one-time support payouts",
        "Coverage for dependents",
        "Fast and transparent claims",
        "Flexible coverage for corporate groups",
        "Dedicated support team",
      ]}
      imageSrc="/images/last-expense-family.jpg"
      subtitle="Caring for Your Loved Ones"
      title="Family Support Cover"
    />
  );
}
