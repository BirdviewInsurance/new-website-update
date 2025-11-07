import type { NextApiRequest, NextApiResponse } from "next";

import * as fs from "fs/promises";
import path from "path";

import nodemailer from "nodemailer";

// ✅ Correct Formidable import for v2/v3
import { IncomingForm, type File as FormidableFile } from "formidable";
import * as XLSX from "xlsx";

export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Helper to parse form safely
function parseForm(req: NextApiRequest): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const publicDir = path.join(process.cwd(), "public");
  const uploadDir = path.join(publicDir, "uploads");
  const filePath = path.join(publicDir, "kenyans-in-bristol.xlsx");

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await fs.mkdir(uploadDir, { recursive: true });

    // ✅ Parse form with proper typings
    const form = new IncomingForm({
      multiples: true,
      uploadDir,
      keepExtensions: true,
    });

    const { fields, files } = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      },
    );

    console.log("📝 Raw fields received:", fields);

    // ✅ Ensure all fields exist and cast safely
    const {
      memberidno = "",
      groupname = "",
      groupnumber = "",
      title = "",
      firstname = "",
      lastname = "",
      middlename = "",
      idtype = "",
      idno = "",
      dateofbirth = "",
      gender = "",
      country = "",
      city = "",
      address = "",
      mobileno = "",
      eimail = "",
      family_option = "",
      option = "",
    } = fields;

    // ✅ JSON parsing with safety fallback
    const parseJsonSafe = <T>(value: any): T[] => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value || [];
      } catch {
        return [];
      }
    };

    const dependantsData = parseJsonSafe(fields.dependantsData);
    const beneficiariesData = parseJsonSafe(fields.beneficiariesData);

    // ✅ Excel workbook load/create
    let workbook: XLSX.WorkBook;
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    workbook = fileBuffer
      ? XLSX.read(fileBuffer, { type: "buffer" })
      : XLSX.utils.book_new();

    // ✅ MEMBER SHEET
    const memberHeaders = [
      "Member Id Number",
      "Group Name",
      "Group Number",
      "Title",
      "First Name",
      "Last Name",
      "Middle Name",
      "ID Type",
      "ID Number",
      "Date Of Birth",
      "Gender",
      "Country",
      "City",
      "Address",
      "Mobile Number",
      "Email",
      "Family Option",
      "Option",
    ];

    let memberSheetData: any[][] = workbook.Sheets["Member Details"]
      ? XLSX.utils.sheet_to_json(workbook.Sheets["Member Details"], {
          header: 1,
        })
      : [memberHeaders];

    memberSheetData.push([
      memberidno,
      groupname,
      groupnumber,
      title,
      firstname,
      lastname,
      middlename,
      idtype,
      idno,
      dateofbirth,
      gender,
      country,
      city,
      address,
      mobileno,
      eimail,
      family_option,
      option,
    ]);

    const memberSheet = XLSX.utils.aoa_to_sheet(memberSheetData);

    workbook.Sheets["Member Details"] = memberSheet;

    if (!workbook.SheetNames.includes("Member Details")) {
      XLSX.utils.book_append_sheet(workbook, memberSheet, "Member Details");
    }

    // ✅ DEPENDANTS SHEET
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
      "Country",
      "City",
    ];

    let depSheetData: any[][] = workbook.Sheets["Dependants Details"]
      ? XLSX.utils.sheet_to_json(workbook.Sheets["Dependants Details"], {
          header: 1,
        })
      : [depHeaders];

    dependantsData.forEach((dep: any, index: number) => {
      if (!dep?.relationship || !dep.firstName || !dep.idnos) return;

      depSheetData.push([
        memberidno,
        depSheetData.length,
        dep.relationship,
        dep.title || "",
        dep.firstName,
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

    // ✅ BENEFICIARIES SHEET
    const benHeaders = [
      "Member Id No",
      "ID",
      "Relationship",
      "Title",
      "Full Name",
      "Date Of Birth",
      "Phone Number",
      "Address",
      "Email",
    ];

    let benSheetData: any[][] = workbook.Sheets["Beneficiaries Info"]
      ? XLSX.utils.sheet_to_json(workbook.Sheets["Beneficiaries Info"], {
          header: 1,
        })
      : [benHeaders];

    beneficiariesData.forEach((ben: any, index: number) => {
      if (!ben?.relationship || !ben.beneficiary_fullname) return;

      benSheetData.push([
        memberidno,
        benSheetData.length,
        ben.relationship,
        ben.title || "",
        ben.beneficiary_fullname,
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

    // ✅ Save file
    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(filePath, updatedBuffer);

    console.log("✅ Excel file updated successfully");

    // ✅ Email setup
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    // ✅ Attachments typed safely
    const attachments: Array<{
      filename: string;
      content?: Buffer;
      path?: string;
    }> = [{ filename: "kenyans-in-bristol.xlsx", content: updatedBuffer }];

    // ✅ Supporting documents
    const uploads = files.supportingDocuments;

    const uploadArray: FormidableFile[] = uploads
      ? Array.isArray(uploads)
        ? uploads
        : [uploads]
      : [];

    uploadArray.forEach((file) => {
      attachments.push({
        filename: file.originalFilename || "document",
        path: file.filepath,
      });
    });

    // ✅ Admin email
    await transporter.sendMail({
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: [
        "Gkangwana@birdviewinsurance.com",
        "pkihuria@birdviewinsurance.com",
        "customerservice@birdviewinsurance.com",
        "akinyanjui@birdviewinsurance.com",
      ],
      subject: `Updated Member Details from ${memberidno} - ${firstname}`,
      text: `Updated Excel sheet. Download:\nhttps://www.birdviewmicroinsurance.com/kenyans-in-bristol.xlsx`,
      attachments,
    });

    // ✅ Member Confirmation Email
    const fullName = `${title} ${firstname} ${middlename} ${lastname}`.trim();

    await transporter.sendMail({
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: eimail,
      subject: `${memberidno} - ${fullName} | Confirmation of Submission`,
      text: `Dear ${fullName},\n\nThank you for your submission.\n\nYour details have been recorded successfully.\n\nRegards,\nBirdview Insurance`,
    });

    return res.status(200).json({
      message: "Form sent successfully",
      fileUrl: "https://www.birdviewmicroinsurance.com/kenyans-in-bristol.xlsx",
      reset: true,
    });
  } catch (error: any) {
    console.error("❌ Error:", error);

    return res
      .status(500)
      .json({ error: error.message || "Unknown server error" });
  }
}
