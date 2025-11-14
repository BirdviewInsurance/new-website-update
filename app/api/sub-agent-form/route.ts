import { NextResponse } from "next/server";
import * as fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

// --- Types ---
type SheetMatrix = (string | number | null)[][];

export interface SubAgentFormForm {
  principal_id: string;
  email: string;
  first_name: string;
  middle_name: string;
  surname: string;
}

export async function POST(req: Request) {
  try {
    const body: SubAgentFormForm = await req.json();
    const { principal_id, first_name, middle_name, surname, email } = body;

    if (!principal_id || !first_name || !surname || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subAgentPayload = {
      principal_id,
      first_name,
      middle_name,
      surname,
      email,
    };

    // External API call with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let response: Response;
    try {
      response = await fetch(
        "https://snownet-core-server.onrender.com/api/underwriting/collaborator/subagent/create/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subAgentPayload),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === "AbortError") {
        console.error("❌ External API timeout");
        // Continue with Excel and email even if external API times out
      } else {
        throw fetchError;
      }
      // Create a mock response to continue processing
      response = new Response(
        JSON.stringify({ message: "External API unavailable, but form saved locally" }),
        { status: 202 }
      );
    }

    let data: any = {};
    try {
      data = await response.json();
    } catch {
      // If response is not JSON, continue anyway
      data = { message: "Form processed" };
    }

    // Excel Handling
    const publicDir = path.join(process.cwd(), "public");
    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, "sub_agents.xlsx");
    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;

    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      worksheet =
        workbook.Sheets["SubAgents"] ||
        XLSX.utils.aoa_to_sheet([
          ["Principal ID", "First Name", "Middle Name", "Surname", "Email"],
        ]);
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([
        ["Principal ID", "First Name", "Middle Name", "Surname", "Email"],
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "SubAgents");
    }

    const existingData: SheetMatrix = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as SheetMatrix;

    existingData.push([principal_id, first_name, middle_name, surname, email]);
    workbook.Sheets["SubAgents"] = XLSX.utils.aoa_to_sheet(existingData);

    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(filePath, updatedBuffer);

    const fileUrl = `https://www.birdviewmicroinsurance.com/sub_agents.xlsx`;

    // Email Team
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const mailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: [
        "Gkangwana@birdviewinsurance.com",
        "pkihuria@birdviewinsurance.com",
        "Akinyanjui@birdviewinsurance.com",
      ],
      subject: `New Sub Agent - ${first_name} ${surname}`,
      text: `A new sub-agent has been submitted. Download the updated list:\n${fileUrl}`,
      attachments: [
        {
          filename: "sub_agents.xlsx",
          content: updatedBuffer,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to team");
    } catch (emailError: any) {
      console.error("⚠️ Email failed to send:", emailError);
      const pendingEmailsPath = path.join(
        publicDir,
        "pending_subagent_emails.json",
      );
      const pendingEmailsContent = await fs
        .readFile(pendingEmailsPath, "utf-8")
        .catch(() => "[]");
      const pendingEmails: any[] = JSON.parse(pendingEmailsContent);

      pendingEmails.push(mailOptions);
      await fs.writeFile(
        pendingEmailsPath,
        JSON.stringify(pendingEmails, null, 2),
      );
    }

    // Return success even if external API had issues
    if (!response.ok && response.status !== 202) {
      return NextResponse.json(
        {
          message: "Form saved locally, but external API returned an error",
          error: data?.error || "External API error",
          fileUrl,
        },
        { status: 202 }
      );
    }

    return NextResponse.json({
      message: "Sub-agent submitted successfully!",
      data,
      fileUrl,
    });
  } catch (error: any) {
    console.error("❌ Unexpected Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

