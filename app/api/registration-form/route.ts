import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

// --- Types ---
type SheetMatrix = (string | number | null)[][];

export interface RegistrationFormForm {
  agencies: number;
  fullnames: string;
  email: string;
  mobileno: string;
}

export async function POST(req: Request) {
  try {
    const body: RegistrationFormForm = await req.json();
    const { fullnames, mobileno, email, agencies } = body;

    // ✅ Ensure public directory exists
    const publicDir = path.join(process.cwd(), "public");

    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, "group_data.xlsx");

    let workbook;

    // ✅ Check if the Excel file exists
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      // ✅ Load existing workbook
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      // ✅ Create a new workbook if file does not exist
      workbook = XLSX.utils.book_new();
    }

    // ✅ Get or create the worksheet
    let worksheet;

    if (workbook.Sheets["Enquiry Data"]) {
      worksheet = workbook.Sheets["Enquiry Data"];
    } else {
      worksheet = XLSX.utils.aoa_to_sheet([
        ["Fullnames", "Mobile No.", "Email", "Agencies They Represent"],
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registration Data");
    }

    // ✅ Append new row
    const newRow = [fullnames, mobileno, email, agencies];

    // ✅ Convert worksheet to JSON and append new row
    const existingData: SheetMatrix = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as SheetMatrix;

    existingData.push(newRow);
    const updatedWorksheet = XLSX.utils.aoa_to_sheet(existingData);

    workbook.Sheets["Registration Data"] = updatedWorksheet;

    // ✅ Write updated workbook to file
    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(filePath, updatedBuffer);

    // ✅ Email Transporter
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    // ✅ Email Options
    const mailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: "customerservice@birdviewinsurance.com",
      subject: `Updated Registration Details from ${fullnames} - ${mobileno}`,
      text: "Please find the updated Excel sheet with all Registration Details.",
      attachments: [
        {
          filename: "registration_data.xlsx",
          content: updatedBuffer,
        },
      ],
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Form sent successfully" });
  } catch (error: any) {
    console.error("Full Error Details:", error);
    return NextResponse.json(
      { error: error?.message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
