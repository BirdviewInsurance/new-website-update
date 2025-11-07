declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MAINTENANCE_MODE: string;
    PORT: string;
    URL_TO_MONITOR: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_WHATSAPP_NUMBER: string;
    WHATSAPP_RECIPIENTS: string;
    MPESA_CONSUMER_KEY: string;
    MPESA_CONSUMER_SECRET: string;
    MPESA_SHORTCODE: string;
    MPESA_PASSKEY: string;
    MPESA_CALLBACK_URL: string;
  }
}
