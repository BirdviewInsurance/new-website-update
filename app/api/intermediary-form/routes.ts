// app/api/intermediary-form/route.ts
import { NextResponse } from "next/server";
import * as fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

export interface IntermediaryFormForm {
  account_name: string;
  account_number: string;
  bank_branch: string;
  bank_name: string;
  city: string;
  company_name: string;
  company_number: string;
  intermediary_type: string;
  country: string;
  dateofbirth: string;
  eimail: string;
  firstname: string;
  gender: string;
  idno: string;
  idtype: string;
  lastname: string;
  middlename: string;
  mobileno: string;
  pin_no: string;
  postal_address: string;
  title: string;
}

export async function POST(req: Request) {
  try {
    const body: IntermediaryFormForm = await req.json();

    // Destructure
    const {
      intermediary_type,
      title,
      firstname,
      middlename,
      lastname,
      gender,
      mobileno,
      postal_address,
      idtype,
      idno,
      pin_no,
      dateofbirth,
      country,
      city,
      eimail,
      company_name,
      company_number,
      bank_name,
      account_name,
      bank_branch,
      account_number,
    } = body;

    // Validate and clean date
    const isValidDate = (date: string) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    };
    const cleanDateOfBirth = isValidDate(dateofbirth)
      ? new Date(dateofbirth).toISOString().split("T")[0]
      : "";

    // Prepare payload for primary API
    const agentPayload = {
      intermediary_type,
      title,
      first_name: firstname,
      middle_name: middlename,
      surname: lastname,
      dob: cleanDateOfBirth,
      gender,
      nationality: "Kenyan",
      country_of_residence: country,
      national_id_passport_no: idno,
      nhif: "N/A",
      pin: pin_no,
      employer: company_name,
      postal_address,
      code: "00100",
      town: city,
      physical_address: "N/A",
      mobile_no: mobileno,
      other_phone: "",
      email: eimail,
      id_type: idtype,
      company_name,
      commission: 10.0,
      bank_name,
      bank_account_name: account_name,
      bank_account_number: account_number,
      bank_branch,
      is_active: false,
    };

    // Submit to main API
    const primaryResponse = await fetch(
      "https://snownet-core-server.onrender.com/api/underwriting/collaborator/agents/create/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentPayload),
      }
    );
    const primaryData = await primaryResponse.json();

    if (!primaryResponse.ok) {
      console.error("❌ Main API Error:", primaryData);
      return NextResponse.json(
        { error: primaryData?.error || "Failed to submit agent" },
        { status: primaryResponse.status }
      );
    }

    // If Broker, also submit to broker endpoint
    if (intermediary_type === "Broker") {
      try {
        await fetch(
          "https://snownet-core-server.onrender.com/api/underwriting/collaborator/brokers/create/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(agentPayload),
          }
        );
      } catch (err) {
        console.warn("⚠️ Broker submission failed:", err);
      }
    }

    // Excel file management
    const publicDir = path.join(process.cwd(), "public");
    await fs.mkdir(publicDir, { recursive: true });
    const filePath = path.join(publicDir, "intermediary_data.xlsx");
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    const workbook = fileBuffer
      ? XLSX.read(fileBuffer, { type: "buffer" })
      : XLSX.utils.book_new();

    let worksheet = workbook.Sheets[intermediary_type];
    if (!worksheet) {
      const headers = [
        "Title",
        "First Name",
        "Middle Name",
        "Last Name",
        "Gender",
        "Mobile No",
        "Postal Address",
        "ID Type",
        "ID No",
        "PIN No",
        "DOB",
        "Country",
        "City",
        "Email",
        "Company Name",
        "Company Number",
        "Bank Name",
        "Account Name",
        "Bank Branch",
        "Account Number",
      ];
      worksheet = XLSX.utils.aoa_to_sheet([headers]);
      XLSX.utils.book_append_sheet(workbook, worksheet, intermediary_type);
    }

    const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    existingData.push([
      title,
      firstname,
      middlename,
      lastname,
      gender,
      mobileno,
      postal_address,
      idtype,
      idno,
      pin_no,
      cleanDateOfBirth,
      country,
      city,
      eimail,
      company_name,
      company_number,
      bank_name,
      account_name,
      bank_branch,
      account_number,
    ]);
    workbook.Sheets[intermediary_type] = XLSX.utils.aoa_to_sheet(existingData);
    const updatedBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    await fs.writeFile(filePath, updatedBuffer);
    const fileUrl = `https://www.birdviewmicroinsurance.com/intermediary_data.xlsx`;

    // Email setup
    const emailMap: Record<string, string[]> = {
      Agent: ["omenjeri@birdviewinsurance.com", "jgatwiri@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
      Broker: ["omenjeri@birdviewinsurance.com", "jgatwiri@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
      "Diaspora Agent": ["akinyanjui@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
      "Recruitment Agent": ["Smirie@birdviewinsurance.com", "Pkiabi@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
    };

    const subjectMap: Record<string, string> = {
      Agent: "New Agent Submissions",
      Broker: "New Broker Submissions",
      "Diaspora Agent": "New Diaspora Agent Submission",
      "Recruitment Agent": "New Recruitment Agent Submission",
    };

    const recipients = emailMap[intermediary_type] ?? ["customerservice@birdviewinsurance.com"];
    const subject = subjectMap[intermediary_type] ?? "New Intermediary Submission";

    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const singleSheetBuffer = XLSX.write(
      { SheetNames: [intermediary_type], Sheets: { [intermediary_type]: workbook.Sheets[intermediary_type] } },
      { bookType: "xlsx", type: "buffer" }
    );

    const mailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: recipients,
      subject,
      text: `A new submission has been made under ${intermediary_type}. You can download the full data sheet here:\n${fileUrl}`,
      attachments: [
        {
          filename: `${intermediary_type.replace(/\s/g, "_")}_submissions.xlsx`,
          content: singleSheetBuffer,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("⚠️ Email failed:", emailError);

      // Save pending email safely
      const pendingPath = path.join(publicDir, "pending_emails.json");
      const lockFile = path.join(publicDir, "pending_emails.lock");

      // Simple lock mechanism to avoid concurrent writes
      await fs.writeFile(lockFile, "locked").catch(() => {});
      const pendingData = await fs.readFile(pendingPath, "utf-8").catch(() => "[]");
      const pendingEmails = JSON.parse(pendingData);
      pendingEmails.push(mailOptions);
      await fs.writeFile(pendingPath, JSON.stringify(pendingEmails, null, 2));
      await fs.unlink(lockFile).catch(() => {});

      return NextResponse.json({ message: "Submitted, email pending", fileUrl }, { status: 202 });
    }

    return NextResponse.json({
      message: "Intermediary submitted successfully!",
      data: primaryData,
      fileUrl,
    });
  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
