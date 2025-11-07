import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_MAINTENANCE_MODE: z.string().default("false"),
  PORT: z.string().default("3000"),
  URL_TO_MONITOR: z.string().url(),

  TWILIO_ACCOUNT_SID: z.string().min(10, "Invalid Twilio SID"),
  TWILIO_AUTH_TOKEN: z.string().min(10, "Invalid Twilio Auth Token"),
  TWILIO_WHATSAPP_NUMBER: z.string().startsWith("whatsapp:"),
  WHATSAPP_RECIPIENTS: z.string(),

  MPESA_CONSUMER_KEY: z.string().min(5),
  MPESA_CONSUMER_SECRET: z.string().min(5),
  MPESA_SHORTCODE: z.string(),
  MPESA_PASSKEY: z.string().min(20),
  MPESA_CALLBACK_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid or missing environment variables");
}

export const env = parsed.data;
