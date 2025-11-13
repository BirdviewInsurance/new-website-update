import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, complaint } = await req.json();

    if (!name || !email || !complaint) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Configure your email transport (use your provider credentials)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASS, // Your email password or App Password
      },
    });

    // ✅ Compose the email
    const mailOptions = {
      from: `"Birdview Complaints" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER, // Your support inbox
      subject: `🧾 New Complaint from ${name}`,
      html: `
        <h2>New Complaint Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Complaint:</strong></p>
        <p style="white-space: pre-line;">${complaint}</p>
        <hr />
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      `,
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Complaint submitted successfully",
    });
  } catch (error: any) {
    console.error("❌ Email sending failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send complaint email" },
      { status: 500 }
    );
  }
}
