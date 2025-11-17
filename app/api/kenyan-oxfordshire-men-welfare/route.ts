import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const publicDir = path.join(process.cwd(), "public");
  const uploadDir = path.join(publicDir, "uploads");
  const filePath = path.join(publicDir, "kenyan-oxfordshire-men-welfare.xlsx");

  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const formData = await req.formData();

    // Extract form fields and files
    const fields: Record<string, string> = {};
    const uploadedFiles: Array<{ filename: string; filepath: string }> = [];

    for (const [key, value] of Array.from(formData.entries())) {
      if (value instanceof File) {
        // Handle file uploads
        const arrayBuffer = await value.arrayBuffer();
        const filename = value.name || `upload_${Date.now()}_${key}`;
        const filepath = path.join(uploadDir, filename);
        
        await fs.writeFile(filepath, new Uint8Array(arrayBuffer));
        
        uploadedFiles.push({
          filename: value.name || filename,
          filepath,
        });
      } else {
        // Handle form fields
        fields[key] = value.toString();
      }
    }

    console.log("📝 Raw fields received:", fields);

    const {
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
    } = fields;

    // parse dependants and beneficiaries safely
    let dependantsData: any[] = [];

    try {
      dependantsData =
        typeof fields.dependantsData === "string"
          ? JSON.parse(fields.dependantsData)
          : [];
      console.log("👨‍👩‍👧 Dependants parsed:", dependantsData);
    } catch (err) {
      console.warn("⚠️ Invalid dependantsData JSON", err);
      dependantsData = [];
    }

    let beneficiariesData: any[] = [];

    try {
      beneficiariesData =
        typeof fields.beneficiariesData === "string"
          ? JSON.parse(fields.beneficiariesData)
          : fields.beneficiariesData || [];
      console.log("🎯 Beneficiaries parsed:", beneficiariesData);
    } catch (err) {
      console.warn("⚠️ Invalid beneficiariesData JSON", err);
      beneficiariesData = [];
    }

    // load or create workbook
    let workbook: XLSX.WorkBook;
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    // --- Member sheet
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
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Member Details"], {
          header: 1,
        }) as any[][])
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

    // --- Dependants sheet
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
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Dependants Details"], {
          header: 1,
        }) as any[][])
      : [depHeaders];

    dependantsData.forEach((dep: any, index: number) => {
      if (!dep || !dep.relationship || !dep.firstName || !dep.idnos) {
        console.warn(`⚠️ Skipping invalid dependant at index ${index}`, dep);

        return;
      }
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

    // --- Beneficiaries sheet
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
      ? (XLSX.utils.sheet_to_json(workbook.Sheets["Beneficiaries Info"], {
          header: 1,
        }) as any[][])
      : [benHeaders];

    beneficiariesData.forEach((ben: any, index: number) => {
      if (!ben || !ben.relationship || !ben.beneficiary_fullname) {
        console.warn(`⚠️ Skipping invalid beneficiary at index ${index}`, ben);

        return;
      }
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

    // write workbook to buffer and save
    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    }) as Buffer;

    await fs.writeFile(filePath, new Uint8Array(updatedBuffer));
    console.log("✅ Excel file updated successfully");

    // Build mail transporter (consider moving sensitive credentials to env vars)
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    // attachments: add the generated workbook
    const attachments: NonNullable<nodemailer.SendMailOptions["attachments"]> =
      [
        {
          filename: "kenyan-oxfordshire-men-welfare.xlsx",
          content: updatedBuffer,
        },
      ];

    // Add uploaded files to attachments
    uploadedFiles.forEach((file) => {
      attachments.push({
        filename: file.filename,
        path: file.filepath,
      });
    });

    const fileUrl = `https://www.birdviewmicroinsurance.com/kenyan-oxfordshire-men-welfare.xlsx`;

    const adminMailOptions: nodemailer.SendMailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: [
        "Gkangwana@birdviewinsurance.com",
        "pkihuria@birdviewinsurance.com",
        "customerservice@birdviewinsurance.com",
        "akinyanjui@birdviewinsurance.com",
      ],
      subject: `Updated Member Details from ${memberidno} - ${firstname}`,
      text: `Please find the updated Excel sheet.\nDownload link:\n${fileUrl}`,
      attachments,
    };

    try {
      await transporter.sendMail(adminMailOptions);
    } catch (emailError) {
      console.error("⚠️ Admin email failed:", emailError);
    }

    const fullName =
      `${title ? title + " " : ""}${firstname} ${middlename ? middlename + " " : ""}${lastname}`.trim();
    const memberSubject = `${memberidno} - ${fullName} | Confirmation of Submission`;

    const memberEmailBody = `
Dear ${fullName},

Thank you for your submission.

📌 MEMBER DETAILS
- Member ID: ${memberidno}
- Group: ${groupname} (${groupnumber})
- Name: ${title || ""} ${firstname || ""} ${middlename || ""} ${lastname || ""}
- ID: ${idtype || ""} ${idno || ""}
- DOB: ${dateofbirth || ""}
- Gender: ${gender || ""}
- Contact: ${mobileno || ""}, ${eimail || ""}
- Location: ${address || ""}, ${city || ""}, ${country || ""}
- Family Option: ${family_option || ""}
- Option : ${option || ""}

📌 DEPENDANTS
${
  dependantsData.length > 0
    ? dependantsData
        .map(
          (d: any, i: number) => `
Dependant ${i + 1}:
- ${d.relationship} - ${d.title || ""} ${d.firstName || ""} ${d.middleName || ""} ${d.surname || ""}`,
        )
        .join("\n")
    : "None"
}

📌 BENEFICIARIES
${
  beneficiariesData.length > 0
    ? beneficiariesData
        .map(
          (b: any, i: number) => `
Beneficiary ${i + 1}:
- ${b.relationship} - ${b.title || ""} ${b.beneficiary_fullname || ""}
- Phone: ${b.phone_number || ""} | Email: ${b.beneficiary_email || ""}`,
        )
        .join("\n")
    : "None"
}

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
      await transporter.sendMail({
        from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
        to: eimail,
        subject: memberSubject,
        text: memberEmailBody,
      });
    } catch (memberEmailErr) {
      console.error("⚠️ Member email failed:", memberEmailErr);
    }

    return NextResponse.json({
      message: "Form sent successfully",
      fileUrl,
      reset: true,
    });
  } catch (error: any) {
    console.error("❌ Error in handler:", error);

    return NextResponse.json(
      { error: error?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
