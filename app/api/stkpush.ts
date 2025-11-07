import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

// Environment variable guards added automatically
if (!process.env.MPESA_CALLBACK_URL) {
  throw new Error("Missing required environment variable: MPESA_CALLBACK_URL");
}
if (!process.env.MPESA_CONSUMER_KEY) {
  throw new Error("Missing required environment variable: MPESA_CONSUMER_KEY");
}
if (!process.env.MPESA_CONSUMER_SECRET) {
  throw new Error(
    "Missing required environment variable: MPESA_CONSUMER_SECRET",
  );
}
if (!process.env.MPESA_PASSKEY) {
  throw new Error("Missing required environment variable: MPESA_PASSKEY");
}
if (!process.env.MPESA_SHORTCODE) {
  throw new Error("Missing required environment variable: MPESA_SHORTCODE");
}

export interface StkpushForm {
  amount: number;
  phone: string;
  idno: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { phone, idno, amount } = req.body;

    if (!phone || !idno || !amount) {
      return res.status(400).json({
        success: false,
        error: "Phone, ID number, and amount are required",
      });
    }

    // 🔹 Credentials (keep in .env.local)
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE; // e.g. 174379
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl =
      process.env.MPESA_CALLBACK_URL ||
      "https://sandbox.safaricom.co.ke/mpesa/callback";

    // 1. Generate access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64",
    );
    const tokenRes = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      },
    );
    const accessToken = (tokenRes.data as { access_token: string })
      .access_token;

    // 2. Create password
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14); // YYYYMMDDHHMMSS
    const password = Buffer.from(shortcode + passkey + timestamp).toString(
      "base64",
    );

    // 🔹 Debug logs
    console.log("DEBUG phone:", phone);
    console.log("DEBUG amount:", amount);
    console.log("DEBUG idno:", idno);
    console.log("DEBUG shortcode:", shortcode);
    console.log("DEBUG passkey starts with:", passkey?.slice(0, 6));
    console.log("DEBUG timestamp:", timestamp);
    console.log("DEBUG password:", password.slice(0, 20) + "...");
    console.log("DEBUG token:", accessToken?.slice(0, 10) + "...");

    // 3. Send STK push request
    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone, // principal phone (must be format 2547XXXXXXXX)
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: idno,
        TransactionDesc: "Medical & Last Expense Cover Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const stkData = stkRes.data as { CheckoutRequestID: string };

    return res.status(200).json({
      success: true,
      checkoutRequestID: stkData.CheckoutRequestID,
      message:
        "STK push initiated. Check your phone (sandbox won't prompt real devices).",
    });
  } catch (error: any) {
    console.error(
      "STK Push Error Raw:",
      JSON.stringify(error?.response?.data || error?.message, null, 2),
    );

    return res.status(500).json({
      success: false,
      error: error?.response?.data || error?.message,
    });
  }
}
