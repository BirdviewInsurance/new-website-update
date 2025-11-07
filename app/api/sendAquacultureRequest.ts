import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";

export interface SendaquacultureRequestForm {
  name: string;
  email: string;
  phone: string;
  request: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, email, phone, request }: SendaquacultureRequestForm =
      req.body;

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

    try {
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "Aquaculture (AQUABIMA) request sent successfully." });
    } catch (error) {
      console.error("Nodemailer Error:", error);

      return res
        .status(500)
        .json({ error: "Failed to send AQUABIMA request." });
    }
  }

  res.setHeader("Allow", ["POST"]);

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
