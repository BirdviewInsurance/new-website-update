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
      host: "mail5016.site4now.net", // Replace with your email provider's SMTP server
      port: 465, // Replace with your email provider's SMTP port
      secure: true, // Set to true for 465, false for other ports
      auth: {
        user: "Customerservice@birdviewinsurance.com", // Your email address
        pass: "B!rdv!ew@2024", // Your email password
      },
    });

    // ✅ Compose the email
    const mailOptions = {
      from: '"Birdview Insurance" <Customerservice@birdviewinsurance.com>',
      to: ["Rmuiru@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
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
