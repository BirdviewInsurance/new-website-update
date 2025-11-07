"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-primary/10 to-danger/10 px-6 py-16">
      <Card className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10">
        <CardHeader className="text-3xl font-bold text-primary">
          Privacy Policy
        </CardHeader>
        <CardBody className="text-gray-700 text-lg space-y-6">
          <p>
            We are committed to safeguarding your privacy. This policy explains
            how we collect, use, and protect your personal data.
          </p>
          <p>
            We only process data necessary to provide our services and ensure
            regulatory compliance. You have full rights to access, correct, and
            request deletion of your data.
          </p>
        </CardBody>
      </Card>
    </main>
  );
}
