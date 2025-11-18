import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export interface SendEmailForm {
  details: string;
  email: string;
  enquiryType: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export async function POST(req: Request) {
  try {
    const body: SendEmailForm = await req.json();
    const { firstName, lastName, email, phone, enquiryType, details } = body;

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

    // Define a clean, dynamic subject line
    const subject = `New Enquiry from ${firstName} ${lastName} - ${enquiryType}`;

    // Define email options with HTML formatting
    const mailOptions = {
      from: '"Birdview Insurance" <Customerservice@birdviewinsurance.com>',
      to: "Customerservice@birdviewinsurance.com", // The recipient's email address
      subject, // Dynamic subject line
      html: `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
        <p><strong>Details:</strong></p>
        <p>${details}</p>
        <hr />
        <p>This message was generated from the Birdview website form.</p>
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ message: "Form sent successfully" });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json(
        { error: "Error sending Form" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
