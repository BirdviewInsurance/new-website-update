import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";

export interface SendEmailForm {
  details: string;
  email: string;
  enquiryType: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phone, enquiryType, details } =
      req.body;

    // Create a transporter object using your email service configuration
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
      res.status(200).json({ message: "Form sent successfully" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Error sending Form" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
