import type { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";
import path from "path";

import nodemailer from "nodemailer";
import * as XLSX from "xlsx";

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
      groupname,
      grouplocation,
      contactperson,
      mobileno,
      email,
      groupConstitution,
      groupRegistered,
      noofmembers,
      currency,
      methodOfContributionMonthly,
      contributionMonthlyAmount,
      methodOfContributionPerclaim,
      contributionPerClaimAmount,
      payoutAmountPer = {},
      noofsiblings,
      noofparents,
      noclaims,
      nomemberclaims,
      nosiblingclaims,
      nospouseclaims,
      noparentclaims,
    } = req.body;

    // ✅ Ensure public directory exists
    const publicDir = path.join(process.cwd(), "public");

    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, "group_data.xlsx");

    let workbook;
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    let worksheet = workbook.Sheets["Enquiry Data"];

    if (!worksheet) {
      worksheet = XLSX.utils.aoa_to_sheet([
        [
          "Group Name",
          "Group Location",
          "Contact Person",
          "Mobile No.",
          "Email",
          "Group Constitution",
          "Group Registered",
          "Number of Members",
          "Currency",
          "Per Month",
          "Monthly Contribution Amount",
          "Per Claim",
          "Per Claim Contribution Amount",
          "Payout Amount Per (Member)",
          "Payout Amount Per (Spouse)",
          "Payout Amount Per (Child)",
          "Payout Amount Per (Sibling)",
          "Payout Amount Per (Parents)",
          "No Of Siblings",
          "No Of Parents",
          "Total Number of Claims",
          "Number of Member Claims",
          "Number of Sibling Claims",
          "Number of Spouse Claims",
          "Number of Parent Claims",
        ],
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiry Data");
    }

    const newRow = [
      groupname,
      grouplocation,
      contactperson,
      mobileno,
      email,
      groupConstitution,
      groupRegistered,
      noofmembers,
      currency,
      methodOfContributionMonthly,
      contributionMonthlyAmount,
      methodOfContributionPerclaim,
      contributionPerClaimAmount,
      payoutAmountPer.member || 0,
      payoutAmountPer.spouse || 0,
      payoutAmountPer.child || 0,
      payoutAmountPer.sibling || 0,
      payoutAmountPer.parent || 0,
      noofsiblings,
      noofparents,
      noclaims,
      nomemberclaims,
      nosiblingclaims,
      nospouseclaims,
      noparentclaims,
    ];

    // ✅ Append new row to worksheet
    const existingData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    }) as any[][];

    existingData.push(newRow);
    const updatedWorksheet = XLSX.utils.aoa_to_sheet(existingData);

    workbook.Sheets["Enquiry Data"] = updatedWorksheet;

    // ✅ Save the Excel file FIRST (even if email fails)
    const updatedBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    await fs.writeFile(filePath, updatedBuffer);
    console.log("✅ Data successfully saved to the Excel file.");

    // ✅ Generate a download URL
    const fileUrl = `/group_data.xlsx`; // File is stored in the public folder

    // ✅ Send email (but DO NOT block the response if it fails)
    const transporter = nodemailer.createTransport({
      host: "mail5016.site4now.net",
      port: 465,
      secure: true,
      auth: {
        user: "quotation@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
    });

    const mailOptions = {
      from: '"Birdview Insurance" <quotation@birdviewinsurance.com>',
      to: "quotation@birdviewinsurance.com",
      subject: `Updated Group Details from ${groupname} - ${mobileno}`,
      text: `Please find the updated Excel sheet with all Group Details.\nDownload it here: ${fileUrl}`,
      attachments: [
        {
          filename: "group_data.xlsx",
          content: updatedBuffer,
        },
      ],
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("✅ Email sent successfully.");
      })
      .catch((emailError) => {
        console.error("❌ Email Sending Failed:", emailError.message);
      });

    // ✅ Respond with the file download URL
    res.status(200).json({
      message: "Form submitted successfully.",
      downloadUrl: fileUrl,
    });
  } catch (error: unknown) {
    console.error("❌ Full Error Details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({ error: errorMessage });
  }
}
