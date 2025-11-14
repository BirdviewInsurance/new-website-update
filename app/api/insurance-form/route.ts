import type { NextApiRequest, NextApiResponse } from "next";

import * as fs from "fs/promises";
import * as fssync from "fs";
import * as path from "path";

import formidable, { Fields, Files, File } from "formidable";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import archiver from "archiver";
import axios from "axios";
import FormData from "form-data";

// Disable Next.js body parsing (formidable handles this)
export const config = {
  api: { bodyParser: false },
};

// Helper to parse multipart form data
async function parseForm(
  req: NextApiRequest,
): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// Utility to create ZIP archive
async function createZip(
  policyHolder: string,
  files: { filename: string; filepath: string }[],
  excelPath: string,
): Promise<string> {
  const zipName = `${policyHolder.replace(/\s+/g, "_")}_Documents.zip`;
  const zipPath = path.join(process.cwd(), "public", zipName);
  const output = fssync.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);
  archive.file(excelPath, { name: path.basename(excelPath) });
  files.forEach((file) => archive.file(file.filepath, { name: file.filename }));

  await archive.finalize();

  return zipPath;
}

// Upload ZIP to Snownet server
async function uploadZipToSnownet(
  zipPath: string,
  policyHolder: string,
): Promise<{ fileUrl?: string; url?: string } | null> {
  try {
    const formData = new FormData();

    formData.append("file", fssync.createReadStream(zipPath));
    formData.append("name", policyHolder);

    const response = await axios.post(
      "https://snownet-core-server.onrender.com/api/aws/s3/upload-document",
      formData,
      {
        headers: { ...formData.getHeaders() },
        timeout: 30000,
        validateStatus: () => true,
      },
    );

    if (response.status >= 400 || !response.data) throw new Error();

    return response.data;
  } catch {
    return null; // Return null safely
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });

    return;
  }

  try {
    const { fields, files } = await parseForm(req);

    // Convert fields to simple object
    const formData: Record<string, string> = {};

    Object.keys(fields).forEach((k) => {
      const value = fields[k];

      formData[k] = Array.isArray(value)
        ? value[0] !== undefined
          ? String(value[0])
          : ""
        : value !== undefined
          ? String(value)
          : "";
    });

    // Extract uploaded files safely
    const uploadedFiles: { filename: string; filepath: string }[] = [
      "idCopy",
      "pinCopy",
      "logBookOrKraPin",
    ].flatMap((k) => {
      const f = files[k];

      if (!f) return [];
      const arr = Array.isArray(f) ? f : [f];

      return arr.map((file: File) => ({
        filename: file.originalFilename || "unknown",
        filepath: file.filepath,
      }));
    });

    // Prepare Excel file
    const publicDir = path.join(process.cwd(), "public");

    await fs.mkdir(publicDir, { recursive: true });
    const excelPath = path.join(publicDir, "vehicle_insurance_proposals.xlsx");

    const headers = [
      "Products",
      "Time On Risk",
      "PIN Number",
      "Policy Holder",
      "Email Address",
      "Registration Number",
      "Chassis Number",
      "Cover Type",
      "Certificate Start Date",
      "Period",
      "Certificate To Date",
      "ID Copy",
      "PIN Copy",
      "Log Book / KRA Copy",
      "Vehicle Make",
      "Year Of Manufacture",
      "License To Carry",
      "Timestamp",
    ];

    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;
    const buffer = await fs.readFile(excelPath).catch(() => null);

    if (buffer) {
      workbook = XLSX.read(buffer, { type: "buffer" });
      worksheet = workbook.Sheets["Vehicle Proposals"];
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([headers]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicle Proposals");
    }

    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    rows.push([
      formData.products || "",
      formData.timeOnRisk || "",
      formData.pinNumber || "",
      formData.policyHolder || "",
      formData.email || "",
      formData.registrationNumber || "",
      formData.chasisNo || "",
      formData.coverType || "",
      formData.certificateStartDate || "",
      formData.period || "",
      formData.certificateToDate || "",
      files.idCopy ? (files.idCopy as File[])[0]?.originalFilename : "N/A",
      files.pinCopy ? (files.pinCopy as File[])[0]?.originalFilename : "N/A",
      files.logBookOrKraPin
        ? (files.logBookOrKraPin as File[])[0]?.originalFilename
        : "N/A",
      formData.vehicleMake || "",
      formData.yearOfMake || "",
      formData.licenseToCarry || "",
      new Date().toISOString(),
    ]);

    workbook.Sheets["Vehicle Proposals"] = XLSX.utils.aoa_to_sheet(rows);
    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(excelPath, updatedBuffer);

    // Zip and upload to Snownet
    const zipPath = await createZip(
      formData.policyHolder,
      uploadedFiles,
      excelPath,
    );
    const snownetResponse = await uploadZipToSnownet(
      zipPath,
      formData.policyHolder,
    );
    const snownetLink =
      snownetResponse?.fileUrl || snownetResponse?.url || "Upload Failed";

    // Configure email
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    await transporter.sendMail({
      from: "customerservice@birdviewinsurance.com",
      to: ["Rmuiru@birdviewinsurance.com", "Eyahuma@birdviewinsurance.com"],
      subject: `New Insurance Proposal: ${formData.policyHolder}`,
      text: `A new proposal was submitted.\n\nZIP Storage Link: ${snownetLink}`,
      attachments: [
        ...uploadedFiles.map((f) => ({
          filename: f.filename,
          path: f.filepath,
        })),
        { filename: "vehicle_insurance_proposals.xlsx", path: excelPath },
      ],
    });

    res.status(200).json({ success: true, snownetZipLink: snownetLink });
  } catch (err: any) {
    console.error("❌ API Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
