import type { NextApiRequest, NextApiResponse } from "next";

import * as fs from "fs/promises";
import path from "path";

import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

// --- Types ---
type SheetMatrix = (string | number | null)[][];

interface Dependant {
  relationship: string;
  title?: string;
  firstName: string;
  middleName?: string;
  surname?: string;
  idtypes?: string;
  idnos?: string;
  dob?: string;
  gendere?: string;
}

interface Beneficiary {
  relationship: string;
  beneficiary_fullname: string;
  title?: string;
  beneficiary_id?: string;
  dob?: string;
  phone_number?: string;
  beneficiary_address?: string;
  beneficiary_email?: string;
}

export interface LittlecabFormsForm {
  memberidno: string;
  title: string;
  firstname: string;
  middlename: string;
  lastname: string;
  dateofbirth: string;
  gender: string;
  idno: string;
  idtype: string;
  kra_pin: string;
  eimail: string;
  mobileno: string;
  option: string;
  other_mobileno: string;
  dependantsData: Dependant[];
  beneficiariesData: Beneficiary[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      memberidno,
      title,
      firstname,
      lastname,
      middlename,
      idtype,
      idno,
      dateofbirth,
      gender,
      kra_pin,
      mobileno,
      other_mobileno,
      eimail,
      option,
      dependantsData = [],
      beneficiariesData = [],
    } = req.body;

    const publicDir = path.join(process.cwd(), "public");

    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, "littlecab_member_details.xlsx");
    const pendingPath = path.join(publicDir, "pending_emails.json");

    let workbook: XLSX.WorkBook;
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    // MEMBER SHEET
    const memberHeaders = [
      "Member Id Number",
      "Title",
      "First Name",
      "Last Name",
      "Middle Name",
      "ID Type",
      "ID Number",
      "Date Of Birth",
      "Gender",
      "KRA PIN",
      "Mobile Number",
      "Other Mobile No",
      "Email",
      "Option",
    ];

    let memberSheetData: SheetMatrix = workbook.Sheets["Member Details"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Member Details"], {
          header: 1,
        }) as SheetMatrix)
      : [memberHeaders];

    memberSheetData.push([
      memberidno,
      title,
      firstname,
      lastname,
      middlename,
      idtype,
      idno,
      dateofbirth,
      gender,
      kra_pin,
      mobileno,
      other_mobileno,
      eimail,
      option,
    ]);

    const memberSheet = XLSX.utils.aoa_to_sheet(memberSheetData);

    workbook.Sheets["Member Details"] = memberSheet;
    if (!workbook.SheetNames.includes("Member Details")) {
      XLSX.utils.book_append_sheet(workbook, memberSheet, "Member Details");
    }

    // DEPENDANTS SHEET
    const depHeaders = [
      "Member Id No",
      "ID",
      "Relationship",
      "Title",
      "First Name",
      "Middle Name",
      "Last Name",
      "ID Type",
      "ID Number",
      "Date Of Birth",
      "Gender",
    ];

    let depSheetData: SheetMatrix = workbook.Sheets["Dependants Details"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Dependants Details"], {
          header: 1,
        }) as SheetMatrix)
      : [depHeaders];

    dependantsData.forEach((dep: Dependant, index: number) => {
      if (!dep || !dep.relationship || !dep.firstName || !dep.idnos) return;

      depSheetData.push([
        memberidno,
        depSheetData.length,
        dep.relationship,
        dep.title || "",
        dep.firstName,
        dep.middleName || "",
        dep.surname || "",
        dep.idtypes,
        dep.idnos,
        dep.dob,
        dep.gendere,
      ]);
    });

    const depSheet = XLSX.utils.aoa_to_sheet(depSheetData);

    workbook.Sheets["Dependants Details"] = depSheet;
    if (!workbook.SheetNames.includes("Dependants Details")) {
      XLSX.utils.book_append_sheet(workbook, depSheet, "Dependants Details");
    }

    // BENEFICIARIES SHEET
    const benHeaders = [
      "Member Id No",
      "ID",
      "Relationship",
      "Title",
      "Full Name",
      "ID Number",
      "Date Of Birth",
      "Phone Number",
      "Address",
      "Email",
    ];

    let benSheetData: SheetMatrix = workbook.Sheets["Beneficiaries Info"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Beneficiaries Info"], {
          header: 1,
        }) as SheetMatrix)
      : [benHeaders];

    beneficiariesData.forEach((ben: Beneficiary, index: number) => {
      if (!ben || !ben.relationship || !ben.beneficiary_fullname) return;

      benSheetData.push([
        memberidno,
        benSheetData.length,
        ben.relationship,
        ben.title || "",
        ben.beneficiary_fullname,
        ben.beneficiary_id || "",
        ben.dob,
        ben.phone_number || "",
        ben.beneficiary_address || "",
        ben.beneficiary_email || "",
      ]);
    });

    const benSheet = XLSX.utils.aoa_to_sheet(benSheetData);

    workbook.Sheets["Beneficiaries Info"] = benSheet;
    if (!workbook.SheetNames.includes("Beneficiaries Info")) {
      XLSX.utils.book_append_sheet(workbook, benSheet, "Beneficiaries Info");
    }

    // SAVE EXCEL
    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(filePath, updatedBuffer);
    const fileUrl = `https://www.birdviewmicroinsurance.com/littlecab_member_details.xlsx`;

    // EMAIL SETUP
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const fullName = `${firstname} ${lastname} ${middlename || ""}`.trim();
    const memberSubject = `${memberidno} - ${fullName} | Confirmation of Submission`;

    const memberEmailBody = `
Dear ${fullName},

Thank you for your submission.

📌 MEMBER DETAILS
- Member ID: ${memberidno}
- Name: ${title} ${firstname} ${middlename || ""} ${lastname}
- ID: ${idtype} ${idno}
- DOB: ${dateofbirth}
- Gender: ${gender}
- KRA PIN: ${kra_pin}
- Contact: ${mobileno}, ${other_mobileno}, ${eimail}
- Option: ${option}

📌 DEPENDANTS
${
  dependantsData.length > 0
    ? dependantsData
        .map(
          (d: Dependant, i: number) => `
Dependant ${i + 1}:
- ${d.relationship} - ${d.title || ""} ${d.firstName} ${d.middleName || ""} ${d.surname || ""}`,
        )
        .join("\n")
    : "None"
}

📌 BENEFICIARIES
${
  beneficiariesData.length > 0
    ? beneficiariesData
        .map(
          (b: Beneficiary, i: number) => `
Beneficiary ${i + 1}:
- ${b.relationship} - ${b.title || ""} ${b.beneficiary_fullname}
- Phone: ${b.phone_number || ""} | Email: ${b.beneficiary_email || ""}`,
        )
        .join("\n")
    : "None"
}
    `.trim();

    // --- SEND EMAILS ---
    let pending: any[] = [];

    // 1. Confirmation to member
    if (eimail && eimail.includes("@")) {
      const memberMail = {
        from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
        to: eimail,
        subject: memberSubject,
        text: memberEmailBody,
      };

      try {
        await transporter.sendMail(memberMail);
        console.log("✅ Member confirmation sent:", eimail);
      } catch (err: any) {
        console.error("❌ Failed to send member email:", err?.message);
        pending.push(memberMail);
      }
    } else {
      console.warn("⚠️ Invalid or missing member email. Skipped.");
    }

    // 2. Notify admins
    const adminMail = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: [
        "Rmuiru@birdviewinsurance.com",
        "pkihuria@birdviewinsurance.com",
        "customerservice@birdviewinsurance.com",
      ],
      subject: `Updated Little Cab Driver Member Details from ${memberidno} - ${firstname}`,
      text: `Please find the updated Excel sheet with the latest Group and Dependants Details.\n\nTo download the file, click the link below:\n${fileUrl}`,
      attachments: [
        {
          filename: "member_details.xlsx",
          content: updatedBuffer,
        },
      ],
    };

    try {
      await transporter.sendMail(adminMail);
      console.log("✅ Admin email sent.");
    } catch (err: any) {
      console.error("❌ Failed to send admin email:", err?.message);
      pending.push(adminMail);
    }

    // SAVE pending_emails.json
    if (pending.length > 0) {
      try {
        const existing = await fs
          .readFile(pendingPath, "utf-8")
          .catch(() => "[]");
        const all: any[] = [...JSON.parse(existing), ...pending];

        await fs.writeFile(pendingPath, JSON.stringify(all, null, 2));
        console.log("📦 Saved failed emails for retry.");
      } catch (err: any) {
        console.error("❌ Failed to save pending emails:", err?.message);
      }
    }

    return res
      .status(200)
      .json({ message: "Form submitted successfully", fileUrl });
  } catch (error: any) {
    console.error("❌ Handler error:", error);

    return res.status(500).json({ error: error?.message || "Server error" });
  }
}
