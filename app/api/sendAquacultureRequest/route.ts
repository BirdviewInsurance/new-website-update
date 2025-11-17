import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export interface SendaquacultureRequestForm {
  name: string;
  email: string;
  phone: string;
  request: string;
}

export async function POST(req: Request) {
  try {
    const body: SendaquacultureRequestForm = await req.json();
    const { name, email, phone, request } = body;

    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "Customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const subject = `Aquaculture (AQUABIMA) Insurance Request - ${name}`;

    const mailOptions = {
      from: '"Birdview Insurance" <Customerservice@birdviewinsurance.com>',
      to: "Underwriting@birdviewinsurance.com",
      subject,
      html: `
        <h2>Aquaculture (AQUABIMA) Insurance Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Request Details:</strong></p>
        <p>${request}</p>
        <hr />
        <p>This message was submitted via the Birdview AQUABIMA request form.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Aquaculture (AQUABIMA) request sent successfully.",
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);

    return NextResponse.json(
      { error: "Failed to send AQUABIMA request." },
      { status: 500 }
    );
  }
}
