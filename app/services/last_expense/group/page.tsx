// /app/services/last-expense/group/page.tsx
import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function CorporateGroupPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/last_expense"
      ctaText="Enroll Your Company"
      description="Provide employees with peace of mind through corporate group last expense plans, covering funeral and emergency support for your workforce."
      features={[
        "Scalable coverage for any company size",
        "Easy enrollment and management",
        "Customizable corporate benefits",
        "Fast claims and reporting",
        "Dedicated account management",
      ]}
      imageSrc="/images/product-photos/last-expense-group.jpg"
      subtitle="Comprehensive Group Coverage for Companies"
      title="Corporate Group Last Expense"
    />
  );
}
