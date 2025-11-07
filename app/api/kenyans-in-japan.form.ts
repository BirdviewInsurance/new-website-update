import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Files, Fields } from "formidable";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// ---- Required by Next.js for formidable ----
export const config = {
  api: { bodyParser: false },
};

// ✅ Environment variable checks
if (!process.env.SMTP_HOST) throw new Error("Missing SMTP_HOST");
if (!process.env.SMTP_USER) throw new Error("Missing SMTP_USER");
if (!process.env.SMTP_PASS) throw new Error("Missing SMTP_PASS");
if (!process.env.SMTP_PORT) throw new Error("Missing SMTP_PORT");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ✅ Formidable v3 correct usage
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      console.error("❌ Formidable parse error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    try {
      // ✅ Flatten fields properly
      const body: Record<string, any> = {};
      for (const key in fields) {
        body[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      }

      const selectedMedicalOption = body.selectedMedicalOption || "None";
      const selectedLastExpenseOptions =
        body.selectedLastExpenseOptions || "None";
      const totalPremium = Number(body.totalPremium || 0);

      // ✅ Excel Path
      const excelPath = path.join(process.cwd(), "data", "members.xlsx");

      let workbook;
      let worksheet;

      if (fs.existsSync(excelPath)) {
        workbook = XLSX.readFile(excelPath);
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
      } else {
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.aoa_to_sheet([
          [
            "MemberID",
            "First Name",
            "Last Name",
            "Email",
            "Phone",
            "Medical Option",
            "Last Expense Options",
            "Total Premium",
          ],
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
      }

      // ✅ Write new row
      const newRow = [
        body.memberidno,
        body.firstname,
        body.lastname,
        body.eimail,
        body.mobileno,
        selectedMedicalOption,
        selectedLastExpenseOptions,
        totalPremium,
      ];

      XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
      XLSX.writeFile(workbook, excelPath);

      // ✅ Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
        },
      });

      // ✅ Email content
      const mailOptions = {
        from: `"Kenyans In Japan" <${process.env.SMTP_USER}>`,
        to: body.eimail,
        cc: "admin@birdviewinsurance.com",
        subject: "Membership Registration Confirmation",
        html: `
          <h2>Membership Registration Successful</h2>
          <p><strong>Member ID:</strong> ${body.memberidno}</p>
          <p><strong>Name:</strong> ${body.firstname} ${body.lastname}</p>
          <p><strong>Email:</strong> ${body.eimail}</p>
          <p><strong>Phone:</strong> ${body.mobileno}</p>

          <h3>Selected Options</h3>
          <p><strong>Medical Option:</strong> ${selectedMedicalOption}</p>
          <p><strong>Last Expense Options:</strong> ${selectedLastExpenseOptions}</p>
          <p><strong>Total Premium:</strong> Ksh ${totalPremium.toLocaleString()}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        message: "✅ Form submitted, Excel updated, and email sent.",
      });
    } catch (error: any) {
      console.error("❌ API Error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
}
