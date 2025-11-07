// pages/api/submit-member.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, type Fields, type Files, type File as FormidableFile, type Options as FormidableOptions } from "formidable";
import * as fs from "fs/promises";
import * as XLSX from "xlsx";
import path from "path";
import nodemailer from "nodemailer";

export const config = {
  api: { bodyParser: false },
};

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
  countrye?: string;
  cities?: string;
}
interface Beneficiary {
  relationship: string;
  beneficiary_fullname: string;
  title?: string;
  dob?: string;
  phone_number?: string;
  beneficiary_address?: string;
  beneficiary_email?: string;
}

// --- Helpers ---
interface FlatFields {
  [key: string]: string;
}

async function parseForm(
  req: NextApiRequest,
  options?: Partial<FormidableOptions>
): Promise<{ fields: FlatFields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: true,
      keepExtensions: true,
      ...(options || {}),
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      const flatFields: FlatFields = {};

      for (const key of Object.keys(fields)) {
        const value = fields[key];

        if (Array.isArray(value)) {
          flatFields[key] = value[0] ?? "";
        } else if (typeof value === "string") {
          flatFields[key] = value;
        } else {
          flatFields[key] = "";
        }
      }

      resolve({ fields: flatFields, files });
    });
  });
}

const getField = (fields: Fields, key: string): string => {
  const value = fields[key];
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) {
    const v = value[0];
    return typeof v === "string" ? v : "";
  }
  return typeof value === "string" ? value : "";
};

const safeJSONParse = <T>(text: string): T[] => {
  try {
    if (!text) return [];
    return JSON.parse(text) as T[];
  } catch {
    return [];
  }
};

// --- Handler ---
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const publicDir = path.join(process.cwd(), "public");
  const uploadDir = path.join(publicDir, "uploads");
  const filePath = path.join(publicDir, "kenyans_in_south_wales_member_details.xlsx");

  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const { fields, files } = await parseForm(req, { uploadDir });

    // Safe extraction of fields (parseForm already returns FlatFields with string values)
    const memberidno = fields.memberidno || "";
    const groupname = fields.groupname || "";
    const groupnumber = fields.groupnumber || "";
    const title = fields.title || "";
    const firstname = fields.firstname || "";
    const lastname = fields.lastname || "";
    const middlename = fields.middlename || "";
    const idtype = fields.idtype || "";
    const idno = fields.idno || "";
    const dateofbirth = fields.dateofbirth || "";
    const gender = fields.gender || "";
    const country = fields.country || "";
    const city = fields.city || "";
    const address = fields.address || "";
    const mobileno = fields.mobileno || "";
    const eimail = fields.eimail || "";
    const family_option = fields.family_option || "";
    const option = fields.option || "";

    // Parse JSON arrays safely
    const dependantsData = safeJSONParse<Dependant>(fields.dependantsData || "");
    const beneficiariesData = safeJSONParse<Beneficiary>(fields.beneficiariesData || "");

    // Load or create workbook
    const fileBuffer = await fs.readFile(filePath).catch(() => null);
    const workbook = fileBuffer ? XLSX.read(fileBuffer, { type: "buffer" }) : XLSX.utils.book_new();

    // MEMBER sheet
    const memberHeaders = [
      "Member Id Number", "Group Name", "Group Number", "Title", "First Name",
      "Last Name", "Middle Name", "ID Type", "ID Number", "Date Of Birth", "Gender",
      "Country", "City", "Address", "Mobile Number", "Email", "Family Option", "Option"
    ];

    const memberSheetData: SheetMatrix = workbook.Sheets["Member Details"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Member Details"], { header: 1 }) as SheetMatrix)
      : [memberHeaders];

    memberSheetData.push([
      memberidno, groupname, groupnumber, title, firstname, lastname, middlename,
      idtype, idno, dateofbirth, gender, country, city, address,
      mobileno, eimail, family_option, option
    ]);

    const memberSheet = XLSX.utils.aoa_to_sheet(memberSheetData);
    workbook.Sheets["Member Details"] = memberSheet;
    if (!workbook.SheetNames.includes("Member Details")) {
      XLSX.utils.book_append_sheet(workbook, memberSheet, "Member Details");
    }

    // DEPENDANTS sheet
    const depHeaders = [
      "Member Id No", "ID", "Relationship", "Title", "First Name", "Middle Name",
      "Last Name", "ID Type", "ID Number", "Date Of Birth", "Gender", "Country", "City"
    ];

    const depSheetData: SheetMatrix = workbook.Sheets["Dependants Details"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Dependants Details"], { header: 1 }) as SheetMatrix)
      : [depHeaders];

    dependantsData.forEach((dep) => {
      if (!dep || !dep.relationship || !dep.firstName || !dep.idnos) return;
      depSheetData.push([
        memberidno,
        depSheetData.length,
        dep.relationship,
        dep.title || "",
        dep.firstName || "",
        dep.middleName || "",
        dep.surname || "",
        dep.idtypes || "",
        dep.idnos || "",
        dep.dob || "",
        dep.gendere || "",
        dep.countrye || "",
        dep.cities || "",
      ]);
    });

    const depSheet = XLSX.utils.aoa_to_sheet(depSheetData);
    workbook.Sheets["Dependants Details"] = depSheet;
    if (!workbook.SheetNames.includes("Dependants Details")) {
      XLSX.utils.book_append_sheet(workbook, depSheet, "Dependants Details");
    }

    // BENEFICIARIES sheet
    const benHeaders = [
      "Member Id No", "ID", "Relationship", "Title", "Full Name",
      "Date Of Birth", "Phone Number", "Address", "Email"
    ];

    const benSheetData: SheetMatrix = workbook.Sheets["Beneficiaries Info"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Beneficiaries Info"], { header: 1 }) as SheetMatrix)
      : [benHeaders];

    beneficiariesData.forEach((ben) => {
      if (!ben || !ben.relationship || !ben.beneficiary_fullname) return;
      benSheetData.push([
        memberidno,
        benSheetData.length,
        ben.relationship,
        ben.title || "",
        ben.beneficiary_fullname || "",
        ben.dob || "",
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

    // Write workbook to buffer and save
    const updatedBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" }) as ArrayBuffer;
    const uint8Array = new Uint8Array(updatedBuffer);
    await fs.writeFile(filePath, uint8Array);
    console.log("✅ Excel file updated successfully");

    // Prepare transporter (use env vars or fallbacks)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "mail5016.site4now.net",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER ?? "customerservice@birdviewinsurance.com",
        pass: process.env.SMTP_PASS ?? "B!rdv!ew@2024",
      },
    });

    // Attachments
    const attachments: any[] = [
      {
        filename: "kenyans_in_south_wales_member_details.xlsx",
        content: updatedBuffer,
      },
    ];

    // Handle uploaded supporting documents field if present
    const uploadField = files.supportingDocuments as FormidableFile | FormidableFile[] | undefined;
    if (uploadField) {
      const uploadArray = Array.isArray(uploadField) ? uploadField : [uploadField];
      uploadArray.forEach(file => {
        attachments.push({
          filename: file.originalFilename ?? "upload",
          path: (file as any).filepath ?? (file as any).filePath ?? undefined, // defensive
        });
      });
    }

    const fileUrl = `https://www.birdviewmicroinsurance.com/kenyans_in_south_wales_member_details.xlsx`;

    // Send admin email
    try {
      await transporter.sendMail({
        from: `"Birdview Insurance" <${process.env.SMTP_USER ?? "customerservice@birdviewinsurance.com"}>`,
        to: ["Gkangwana@birdviewinsurance.com", "pkihuria@birdviewinsurance.com", "customerservice@birdviewinsurance.com", "akinyanjui@birdviewinsurance.com"],
        subject: `Updated Member Details from ${memberidno} - ${firstname}`,
        text: `Please find the updated Excel sheet.\nDownload link:\n${fileUrl}`,
        attachments,
      });
    } catch (emailError) {
      console.error("⚠️ Admin email failed:", emailError);
    }

    // Send member confirmation
    const fullName = `${title ? title + " " : ""}${firstname} ${middlename ? middlename + " " : ""}${lastname}`.trim();
    const memberSubject = `${memberidno} - ${fullName} | Confirmation of Submission`;

    const memberEmailBody = `
Dear ${fullName},

Thank you for your submission.

📌 MEMBER DETAILS
- Member ID: ${memberidno}
- Group: ${groupname} (${groupnumber})
- Name: ${title} ${firstname} ${middlename || ''} ${lastname}
- ID: ${idtype} ${idno}
- DOB: ${dateofbirth}
- Gender: ${gender}
- Contact: ${mobileno}, ${eimail}
- Location: ${address}, ${city}, ${country}
- Family Option: ${family_option}
- Option : ${option}

📌 DEPENDANTS
${dependantsData.length > 0 ? dependantsData.map((d, i) => `
Dependant ${i + 1}:
- ${d.relationship} - ${d.title || ''} ${d.firstName} ${d.middleName || ''} ${d.surname || ''}`).join('\n') : 'None'}

📌 BENEFICIARIES
${beneficiariesData.length > 0 ? beneficiariesData.map((b, i) => `
Beneficiary ${i + 1}:
- ${b.relationship} - ${b.title || ''} ${b.beneficiary_fullname}
- Phone: ${b.phone_number || ''} | Email: ${b.beneficiary_email || ''}`).join('\n') : 'None'}

📌 PAYMENT INSTRUCTIONS

Please make your membership payment using the bank details below:

Account Name: CITYBOXCOURIERS  
Sort code: 55 50 28  
Account Number: 70161909

⚠️ IMPORTANT: Use your Member ID Number (${memberidno}) as the Reference Number.

⚠️ NOTE: Policy will be effective after uploading proof of payment.

Warm regards,  
Birdview Insurance`.trim();

    try {
      if (eimail) {
        await transporter.sendMail({
          from: `"Birdview Insurance" <${process.env.SMTP_USER ?? "customerservice@birdviewinsurance.com"}>`,
          to: eimail,
          subject: memberSubject,
          text: memberEmailBody,
        });
      } else {
        console.warn("⚠️ Member email not provided, skipping member confirmation email.");
      }
    } catch (memberEmailErr) {
      console.error("⚠️ Member email failed:", memberEmailErr);
    }

    return res.status(200).json({ message: "Form sent successfully", fileUrl, reset: true });
  } catch (err: any) {
    console.error("❌ Error in handler:", err);
    return res.status(500).json({ error: err?.message || "Unknown server error" });
  }
}
