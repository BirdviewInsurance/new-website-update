import { NextResponse } from "next/server";
import * as fs from "fs/promises";
import * as fssync from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import archiver from "archiver";
import axios from "axios";
import FormData from "form-data";

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Convert FormData to simple object
    const formFields: Record<string, string> = {};
    const uploadedFiles: { filename: string; filepath: string; fieldName: string }[] = [];
    const fileNames: Record<string, string> = {};
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    // Process form data and files
    for (const [key, value] of Array.from(formData.entries())) {
      if (value instanceof File) {
        // Handle file uploads
        const arrayBuffer = await value.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filename = value.name || `upload_${Date.now()}_${key}`;
        const filepath = path.join(uploadDir, filename);

        await fs.writeFile(filepath, new Uint8Array(buffer));

        uploadedFiles.push({
          filename: value.name || filename,
          filepath,
          fieldName: key,
        });

        // Store filename by field name for easy lookup
        fileNames[key] = value.name || filename;
      } else {
        // Handle form fields
        formFields[key] = value.toString();
      }
    }

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

    // Get file names from uploaded files
    const idCopyName = fileNames["idCopy"] || "N/A";
    const pinCopyName = fileNames["pinCopy"] || "N/A";
    const logBookName = fileNames["logBookOrKraPin"] || "N/A";

    rows.push([
      formFields.products || "",
      formFields.timeOnRisk || "",
      formFields.pinNumber || "",
      formFields.policyHolder || "",
      formFields.email || "",
      formFields.registrationNumber || "",
      formFields.chasisNo || "",
      formFields.coverType || "",
      formFields.certificateStartDate || "",
      formFields.period || "",
      formFields.certificateToDate || "",
      idCopyName,
      pinCopyName,
      logBookName,
      formFields.vehicleMake || "",
      formFields.yearOfMake || "",
      formFields.licenseToCarry || "",
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
      formFields.policyHolder,
      uploadedFiles,
      excelPath,
    );
    const snownetResponse = await uploadZipToSnownet(
      zipPath,
      formFields.policyHolder,
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
      subject: `New Insurance Proposal: ${formFields.policyHolder}`,
      text: `A new proposal was submitted.\n\nZIP Storage Link: ${snownetLink}`,
      attachments: [
        ...uploadedFiles.map((f) => ({
          filename: f.filename,
          path: f.filepath,
        })),
        { filename: "vehicle_insurance_proposals.xlsx", path: excelPath },
      ],
    });

    return NextResponse.json({ success: true, snownetZipLink: snownetLink });
  } catch (err: any) {
    console.error("❌ API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
