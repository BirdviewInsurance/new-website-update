import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function DailyHospitalPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/hospital_cash"
      ctaText="Apply for Daily Benefit"
      description="Receive daily cash payouts to help cover hospital expenses, transportation, and daily needs during hospitalization. Our plan ensures financial relief when you need it most."
      features={[
        "Fixed daily cash benefits",
        "Coverage for in-patient hospital stays",
        "Supports recovery and medical expenses",
        "Simple claims with fast processing",
        "Available for individuals and families",
      ]}
      imageSrc="/images/hospital-daily.jpg"
      subtitle="Daily Cash Support During Hospitalization"
      title="Daily Hospital Benefit"
    />
  );
}
