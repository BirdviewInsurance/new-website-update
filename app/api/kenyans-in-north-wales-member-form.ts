import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, type Fields, type Files, type Options } from "formidable";
import nodemailer from "nodemailer";
import * as fs from "fs/promises";
import * as XLSX from "xlsx";
import path from "path";

// Required for formidable with Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// ----------------------------
// ✅ Formidable Parse Helper
// ----------------------------
function parseForm(
  req: NextApiRequest,
  options: Partial<Options> = {}
): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: true,
      keepExtensions: true,
      ...options,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// ----------------------------
// ✅ MAIN HANDLER
// ----------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const publicDir = path.join(process.cwd(), "public");
    const uploadDir = path.join(publicDir, "uploads");
    const filePath = path.join(
      publicDir,
      "kenyans_in_north_wales_member_details.xlsx"
    );

    await fs.mkdir(uploadDir, { recursive: true });

    // ✅ Parse form-data
    const { fields, files } = await parseForm(req, {
      uploadDir,
    });

    // ----------------------------
    // ✅ Extract Clean Fields
    // ----------------------------
    const getField = (key: string): string => {
      const value = fields[key];

      if (value === undefined || value === null) return "";

      if (Array.isArray(value)) {
        const v = value[0];
        return typeof v === "string" ? v : "";
      }

      return typeof value === "string" ? value : "";
    };


    const memberidno = getField("memberidno");
    const firstname = getField("firstname");
    const lastname = getField("lastname");
    const middlename = getField("middlename");

    const groupname = getField("groupname");
    const groupnumber = getField("groupnumber");
    const title = getField("title");

    const idtype = getField("idtype");
    const idno = getField("idno");

    const dateofbirth = getField("dateofbirth");
    const gender = getField("gender");
    const country = getField("country");
    const city = getField("city");
    const address = getField("address");

    const mobileno = getField("mobileno");
    const eimail = getField("eimail");
    const family_option = getField("family_option");
    const option = getField("option");

    // ----------------------------
    // ✅ Parse Dependants & Beneficiaries JSON
    // ----------------------------
    const dependantsData = JSON.parse(getField("dependantsData") || "[]") as any[];
    const beneficiariesData = JSON.parse(getField("beneficiariesData") || "[]") as any[];

    // ----------------------------
    // ✅ Load or Create Excel Workbook
    // ----------------------------
    let workbook;
    const buffer = await fs.readFile(filePath).catch(() => null);

    workbook = buffer
      ? XLSX.read(buffer, { type: "buffer" })
      : XLSX.utils.book_new();

    // ----------------------------
    // ✅ MEMBER SHEET
    // ----------------------------
    const memberHeaders = [
      "Member Id Number", "Group Name", "Group Number", "Title", "First Name",
      "Last Name", "Middle Name", "ID Type", "ID Number", "Date Of Birth", "Gender",
      "Country", "City", "Address", "Mobile Number", "Email", "Family Option", "Option"
    ];

    let memberSheetData: any[][] = workbook.Sheets["Member Details"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Member Details"], { header: 1 }) as any[][])
      : [memberHeaders];

    memberSheetData.push([
      memberidno, groupname, groupnumber, title, firstname, lastname, middlename,
      idtype, idno, dateofbirth, gender, country, city, address,
      mobileno, eimail, family_option, option,
    ]);

    workbook.Sheets["Member Details"] = XLSX.utils.aoa_to_sheet(memberSheetData);
    if (!workbook.SheetNames.includes("Member Details"))
      XLSX.utils.book_append_sheet(workbook, workbook.Sheets["Member Details"], "Member Details");

    // ----------------------------
    // ✅ DEPENDANTS SHEET
    // ----------------------------
    const depHeaders = [
      "Member Id No", "ID", "Relationship", "Title", "First Name",
      "Middle Name", "Last Name", "ID Type", "ID Number", "Date Of Birth",
      "Gender", "Country", "City"
    ];

    let depSheetData: any[][] = workbook.Sheets["Dependants Details"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Dependants Details"], { header: 1 }) as any[][])
      : [depHeaders];

    dependantsData.forEach((d, i) => {
      if (!d.relationship || !d.firstName || !d.idnos) return;

      depSheetData.push([
        memberidno, depSheetData.length, d.relationship, d.title || "",
        d.firstName, d.middleName || "", d.surname || "",
        d.idtypes, d.idnos, d.dob, d.gendere, d.countrye, d.cities,
      ]);
    });

    workbook.Sheets["Dependants Details"] = XLSX.utils.aoa_to_sheet(depSheetData);
    if (!workbook.SheetNames.includes("Dependants Details"))
      XLSX.utils.book_append_sheet(workbook, workbook.Sheets["Dependants Details"], "Dependants Details");

    // ----------------------------
    // ✅ BENEFICIARIES SHEET
    // ----------------------------
    const benHeaders = [
      "Member Id No", "ID", "Relationship", "Title", "Full Name",
      "Date Of Birth", "Phone Number", "Address", "Email",
    ];

    let benSheetData: any[][] = workbook.Sheets["Beneficiaries Info"]
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Beneficiaries Info"], { header: 1 }) as any[][])
      : [benHeaders];

    beneficiariesData.forEach((b, i) => {
      if (!b.relationship || !b.beneficiary_fullname) return;

      benSheetData.push([
        memberidno, benSheetData.length, b.relationship, b.title || "",
        b.beneficiary_fullname, b.dob,
        b.phone_number || "", b.beneficiary_address || "", b.beneficiary_email || "",
      ]);
    });

    workbook.Sheets["Beneficiaries Info"] = XLSX.utils.aoa_to_sheet(benSheetData);
    if (!workbook.SheetNames.includes("Beneficiaries Info"))
      XLSX.utils.book_append_sheet(workbook, workbook.Sheets["Beneficiaries Info"], "Beneficiaries Info");

    // ✅ Save updated Excel file
    const updatedBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await fs.writeFile(filePath, updatedBuffer);

    // ----------------------------
    // ✅ Email Setup
    // ----------------------------
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.BIRDVIEW_EMAIL ?? "customerservice@birdviewinsurance.com",
        pass: process.env.BIRDVIEW_PASS ?? "B!rdv!ew@2024",
      },
    });

    // ✅ Attach uploaded files
    const attachments: any[] = [
      {
        filename: "kenyans_in_north_wales_member_details.xlsx",
        content: updatedBuffer,
      },
    ];

    const uploads = files.supportingDocuments;
    if (uploads) {
      const uploadArray = Array.isArray(uploads) ? uploads : [uploads];
      uploadArray.forEach((file: any) => {
        attachments.push({
          filename: file.originalFilename,
          path: file.filepath,
        });
      });
    }

    // ----------------------------
    // ✅ Send Admin Email
    // ----------------------------
    await transporter.sendMail({
      from: `"Birdview Insurance" <customerservice@birdviewinsurance.com>`,
      to: [
        "Gkangwana@birdviewinsurance.com",
        "pkihuria@birdviewinsurance.com",
        "customerservice@birdviewinsurance.com",
        "akinyanjui@birdviewinsurance.com",
      ],
      subject: `Updated Member Details from ${memberidno} - ${firstname}`,
      text: `Please find the updated Excel sheet attached.`,
      attachments,
    });

    // ----------------------------
    // ✅ Send Member Confirmation Email
    // ----------------------------
    const fullName = `${firstname} ${middlename} ${lastname}`.trim();

    await transporter.sendMail({
      from: `"Birdview Insurance" <customerservice@birdviewinsurance.com>`,
      to: eimail,
      subject: `${memberidno} - ${fullName} | Confirmation of Submission`,
      text: `Dear ${fullName},\n\nThank you for your submission.\n\nYour membership has been received.`,
    });

    return res.status(200).json({
      message: "Form submitted successfully",
      reset: true,
    });
  } catch (err: any) {
    console.error("❌ Server Error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
