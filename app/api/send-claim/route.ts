import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Extract form fields
    const policy_no = formData.get("policy_no")?.toString();
    const national_id = formData.get("national_id")?.toString();
    const contactperson = formData.get("contactperson")?.toString();

    // Prepare attachments from uploaded files
    const attachments: Array<{ filename: string; path: string }> = [];
    const supportingDocuments = formData.getAll("supportingDocuments");

    for (const file of supportingDocuments) {
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        const filename = file.name || `document_${Date.now()}`;
        const filepath = path.join(uploadDir, filename);
        
        await fs.writeFile(filepath, new Uint8Array(arrayBuffer));
        
        attachments.push({
          filename: file.name || filename,
          path: filepath,
        });
      }
    }

    // Email transporter
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "Claims@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const mailOptions = {
      from: `"Birdview Claims" <Claims@birdviewinsurance.com>`,
      to: "Claims@birdviewinsurance.com",
      cc: "Mandaro@birdviewinsurance.com",
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
      return NextResponse.json({ message: "Email sent successfully!" });
    } catch (emailErr) {
      console.error("Error sending email:", emailErr);
      return NextResponse.json(
        { message: "Failed to send email." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing claim:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
