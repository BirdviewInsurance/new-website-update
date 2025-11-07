import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';

// Helper to parse formidable multipart form data in an async/await style
function parseForm(req: NextApiRequest): Promise<{ fields: any; files: any; }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Form parsing failed' });
    }

    const { policy_no, national_id, contactperson } = fields;

    // Prepare attachments
    const attachments = [];
    const uploadedFiles = Array.isArray(files.supportingDocuments)
      ? files.supportingDocuments
      : [files.supportingDocuments];

    for (const file of uploadedFiles) {
      if (file?.filepath) {
        attachments.push({
          filename: file.originalFilename || file.newFilename || 'file',
          content: fs.createReadStream(file.filepath),
        });
      }
    }

    // Email transporter
    const transporter = nodemailer.createTransport({
          host: 'mail5016.site4now.net', // Replace with your email provider's SMTP server
          port: 465, // Replace with your email provider's SMTP port
          secure: true, // Set to true for 465, false for other ports
          auth: {
            user: "Claims@birdviewinsurance.com", // Your email address
            pass: "B!rdv!ew@2024", // Your email password
          },
        });

    const mailOptions = {
      from: `"Birdview Claims" <Claims@birdviewinsurance.com>`,
      to: 'Claims@birdviewinsurance.com',
      cc: 'Mandaro@birdviewinsurance.com',
      subject: `New Claim Submission - Policy No: ${policy_no}`,
      text: `New claim form submitted:

Policy Number: ${policy_no}
National ID: ${national_id}
Contact Person: ${contactperson}
      `,
      attachments: attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (emailErr) {
      console.error('Error sending email:', emailErr);
      res.status(500).json({ message: 'Failed to send email.' });
    }
  });
}
