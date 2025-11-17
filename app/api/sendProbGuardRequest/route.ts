import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export interface SendProbGuardRequestForm {
  name: string;
  email: string;
  phone: string;
  request: string;
}

export async function POST(req: Request) {
  try {
    const body: SendProbGuardRequestForm = await req.json();
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

    const subject = `Probation Guard Request - ${name}`;

    const mailOptions = {
      from: '"Birdview Insurance" <Customerservice@birdviewinsurance.com>',
      to: "Underwriting@birdviewinsurance.com",
      subject,
      html: `
        <h2>Probation Guard Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Request Details:</strong></p>
        <p>${request}</p>
        <hr />
        <p>This message was submitted via the Birdview Probation Guard request form.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Probation Guard request sent successfully.",
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);

    return NextResponse.json(
      { error: "Failed to send probation guard request." },
      { status: 500 }
    );
  }
}
