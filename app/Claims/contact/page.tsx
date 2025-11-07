"use client";

import { motion } from "framer-motion";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function ContactSupportPage() {
  const [loading, setLoading] = useState(false);

  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white flex items-center justify-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-semibold mb-3">Contact Support</h1>
          <p className="text-lg text-gray-200">
            We’re always here for you — every step of your claim journey.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-default-600 mb-10">
          Need help with your policy or claim? Reach out to our support experts
          below — we’ll get back to you within 24 hours.
        </p>

        <form className="space-y-6 bg-white/70 p-8 rounded-2xl backdrop-blur-md border border-default-200 shadow-sm">
          <Input
            fullWidth
            required
            label="Full Name"
            placeholder="Enter your Fullname"
          />
          <Input
            fullWidth
            required
            label="Email Address"
            placeholder="Enter your Email"
            type="email"
          />
          <Textarea
            fullWidth
            required
            label="Message"
            placeholder="How can we help you?"
            rows={5}
          />
          <Button
            className="rounded-xl w-full text-white font-semibold"
            color="primary"
            isLoading={loading}
            size="lg"
            onPress={() => setLoading(true)}
          >
            Send Message
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
