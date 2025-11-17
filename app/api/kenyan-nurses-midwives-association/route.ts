import { NextResponse } from "next/server";
import * as fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  const publicDir = path.join(process.cwd(), "public");
  const uploadDir = path.join(publicDir, "uploads");
  const filePath = path.join(
    publicDir,
    "kenyan-nurses-midwives-association.xlsx",
  );

  try {
    await fs.mkdir(uploadDir, { recursive: true });

    const formData = await req.formData();

    // Extract form fields
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

    let dependantsData = [];

    try {
      dependantsData = JSON.parse(fields.dependantsData || "[]");
      console.log("👨‍👩‍👧 Dependants parsed:", dependantsData);
    } catch (err) {
      console.warn("⚠️ Invalid dependantsData JSON");
    }

    let beneficiariesData = [];

    try {
      beneficiariesData = JSON.parse(fields.beneficiariesData || "[]");
      console.log("🎯 Beneficiaries parsed:", beneficiariesData);
    } catch (err) {
      console.warn("⚠️ Invalid beneficiariesData JSON");
    }

    let workbook;
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

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
    let memberSheetData = workbook.Sheets["Member Details"]
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

    const memberSheet = XLSX.utils.aoa_to_sheet(memberSheetData as any[][]);

    workbook.Sheets["Member Details"] = memberSheet;
    if (!workbook.SheetNames.includes("Member Details")) {
      XLSX.utils.book_append_sheet(workbook, memberSheet, "Member Details");
    }

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
    let depSheetData = workbook.Sheets["Dependants Details"]
      ? XLSX.utils.sheet_to_json(workbook.Sheets["Dependants Details"], {
          header: 1,
        })
      : [depHeaders];

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

    const dependantsDataTyped: Dependant[] = dependantsData;

    dependantsDataTyped.forEach((dep: Dependant, index: number) => {
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
        dep.idtypes,
        dep.idnos,
        dep.dob,
        dep.gendere,
        dep.countrye,
        dep.cities,
      ]);
    });

    const depSheet = XLSX.utils.aoa_to_sheet(depSheetData as any[][]);

    workbook.Sheets["Dependants Details"] = depSheet;
    if (!workbook.SheetNames.includes("Dependants Details")) {
      XLSX.utils.book_append_sheet(workbook, depSheet, "Dependants Details");
    }

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
    let benSheetData = workbook.Sheets["Beneficiaries Info"]
      ? XLSX.utils.sheet_to_json(workbook.Sheets["Beneficiaries Info"], {
          header: 1,
        })
      : [benHeaders];

    interface Beneficiary {
      relationship: string;
      title?: string;
      beneficiary_fullname: string;
      dob?: string;
      phone_number?: string;
      beneficiary_address?: string;
      beneficiary_email?: string;
    }

    const beneficiariesDataTyped: Beneficiary[] = beneficiariesData;

    beneficiariesDataTyped.forEach((ben: Beneficiary, index: number) => {
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
        ben.dob,
        ben.phone_number || "",
        ben.beneficiary_address || "",
        ben.beneficiary_email || "",
      ]);
    });

    const benSheet = XLSX.utils.aoa_to_sheet(benSheetData as any[][]);

    workbook.Sheets["Beneficiaries Info"] = benSheet;
    if (!workbook.SheetNames.includes("Beneficiaries Info")) {
      XLSX.utils.book_append_sheet(workbook, benSheet, "Beneficiaries Info");
    }

    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(filePath, updatedBuffer);
    console.log("✅ Excel file updated successfully");

    const fileUrl = `https://www.birdviewmicroinsurance.com/kenyan-nurses-midwives-association.xlsx`;
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const attachments: Array<{
      filename: string;
      content?: any;
      path?: string;
    }> = [
      {
        filename: "kenyan-nurses-midwives-association.xlsx",
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

    const adminMailOptions = {
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

    const fullName = `${firstname} ${lastname} ${middlename || ""}`.trim();
    const memberSubject = `${memberidno} - ${fullName} | Confirmation of Submission`;

    interface MemberFields {
      memberidno: string;
      groupname: string;
      groupnumber: string;
      title: string;
      firstname: string;
      lastname: string;
      middlename?: string;
      idtype: string;
      idno: string;
      dateofbirth: string;
      gender: string;
      country: string;
      city: string;
      address: string;
      mobileno: string;
      eimail: string;
    }

    // Define DependantEmail and BeneficiaryEmail types for email rendering
    type DependantEmail = {
      relationship: string;
      title?: string;
      firstName: string;
      middleName?: string;
      surname?: string;
    };

    type BeneficiaryEmail = {
      relationship: string;
      title?: string;
      beneficiary_fullname: string;
      dob?: string;
      phone_number?: string;
      beneficiary_address?: string;
      beneficiary_email?: string;
    };

    const memberEmailBody: string = `Account Number: 70161909
  Dear ${fullName},

      Thank you for your submission.

  📌 MEMBER DETAILS
      - Member ID: ${memberidno}
    - Group: ${groupname} (${groupnumber})
    - Name: ${title} ${firstname} ${middlename || ""} ${lastname}
    - ID: ${idtype} ${idno}
    - DOB: ${dateofbirth}
    - Gender: ${gender}
    - Contact: ${mobileno}, ${eimail}
    - Location: ${address}, ${city}, ${country}
    - Family Option: ${family_option}
    - Option : ${option}

  📌 DEPENDANTS
  ${
    (dependantsData as DependantEmail[]).length > 0
      ? (dependantsData as DependantEmail[])
          .map(
            (d: DependantEmail, i: number) => `
  Dependant ${i + 1}:
  - ${d.relationship} - ${d.title || ""} ${d.firstName} ${d.middleName || ""} ${d.surname || ""}`,
          )
          .join("\n")
      : "None"
  }

  📌 BENEFICIARIES
  ${
    (beneficiariesData as BeneficiaryEmail[]).length > 0
      ? (beneficiariesData as BeneficiaryEmail[])
          .map(
            (b: BeneficiaryEmail, i: number) => `
  Beneficiary ${i + 1}:
  - ${b.relationship} - ${b.title || ""} ${b.beneficiary_fullname}
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

  ⚠️ IMPORTANT: Use your Member ID Number(${memberidno}) as the Reference Number.

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
  } catch (error) {
    console.error("❌ Error in handler:", error);
    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
