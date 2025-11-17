import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";

// ✅ Environment variable checks
if (!process.env.SMTP_HOST) throw new Error("Missing SMTP_HOST");
if (!process.env.SMTP_USER) throw new Error("Missing SMTP_USER");
if (!process.env.SMTP_PASS) throw new Error("Missing SMTP_PASS");
if (!process.env.SMTP_PORT) throw new Error("Missing SMTP_PORT");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const body: Record<string, any> = {};
    for (const [key, value] of Array.from(formData.entries())) {
      if (value instanceof File) {
        // Handle file if needed
        continue;
      }
      body[key] = value;
    }

    const selectedMedicalOption = body.selectedMedicalOption || "None";
    const selectedLastExpenseOptions =
      body.selectedLastExpenseOptions || "None";
    const totalPremium = Number(body.totalPremium || 0);

    // ✅ Excel Path
    const excelPath = path.join(process.cwd(), "data", "members.xlsx");

    // Ensure data directory exists
    const dataDir = path.dirname(excelPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

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
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
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

    return NextResponse.json({
      message: "✅ Form submitted, Excel updated, and email sent.",
    });
  } catch (error: any) {
    console.error("❌ API Error:", error);

    return NextResponse.json(
      { error: error.message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
