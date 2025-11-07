import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Helper: Convert PDFKit stream → Buffer
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const formData = req.body;
        const {
            memberName,
            policyNumber,
            memberPhone,
            amountAssured,
            claimantName,
            relationship,
            claimantAddress,
            claimantPhone,
            amountClaimed,
            corporateGroup,
            bankName,
            bankBranch,
            accountName,
            accountNumber,
            mpesaNumber,
            mpesaPaybill,
            reimbursementAmount,
            medicalAssessorName,
            medicalAssessorSignature,
            claimsManagerName,
            claimsManagerSignature,
            burialPermit,
            deceasedIDCopy,
            claimantIDCopy,
            bankMpesaDetails,
            consentMarketing,
            consentMinor,
            privacyDate,
            privacySignature,
        } = formData;

        if (!memberName) {
            return res.status(400).json({ error: "Member Name is required" });
        }

        // 1. Create PDF Document
        const doc = new PDFDocument({ margin: 50 });
        const logoPath = path.join(process.cwd(), "public/images/logo1.png");

        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 30, { width: 100 });
        }

        doc
            .fontSize(20)
            .fillColor("#1a237e")
            .text("Birdview Insurance", { align: "center" });
        doc
            .fontSize(16)
            .fillColor("#0d47a1")
            .text("Last Expense Claim Form 2025", { align: "center" });
        doc.moveDown(2);

        // --- Section 1: Member & Claim Details ---
        doc.fontSize(14).fillColor("#1a237e").text("1. Member & Claim Details", {
            underline: true,
        });
        doc.moveDown();
        doc.fontSize(12).fillColor("black");
        doc.text(`Name of Member: ${memberName}`);
        doc.text(`Membership / Policy No.: ${policyNumber || "N/A"}`);
        doc.text(`Mobile No.: ${memberPhone || "N/A"}`);
        doc.text(`Amount Assured: ${amountAssured || "N/A"}`);
        doc.moveDown();
        doc.text(`Claimant / Beneficiary: ${claimantName || "N/A"}`);
        doc.text(`Relationship to Member: ${relationship || "N/A"}`);
        doc.text(`Claimant Address: ${claimantAddress || "N/A"}`);
        doc.text(`Claimant Mobile No.: ${claimantPhone || "N/A"}`);
        doc.text(`Amount Claimed: ${amountClaimed || "N/A"}`);
        doc.moveDown();
        doc.text(`Corporate / Group Name: ${corporateGroup || "N/A"}`);
        doc.moveDown(2);

        // --- Section 2: Mode of Payment ---
        doc.fontSize(14).fillColor("#1a237e").text("2. Mode of Payment", {
            underline: true,
        });
        doc.moveDown();
        doc.fontSize(12).fillColor("black");
        doc.text(`Bank Name: ${bankName || "N/A"}`);
        doc.text(`Branch: ${bankBranch || "N/A"}`);
        doc.text(`Account Name: ${accountName || "N/A"}`);
        doc.text(`Account No.: ${accountNumber || "N/A"}`);
        doc.text(`M-Pesa No.: ${mpesaNumber || "N/A"}`);
        doc.text(`M-Pesa Paybill: ${mpesaPaybill || "N/A"}`);
        doc.moveDown(2);

        // --- Section 3: Reimbursement ---
        doc.fontSize(14).fillColor("#1a237e").text("3. Reimbursement", {
            underline: true,
        });
        doc.moveDown();
        doc.fontSize(12).fillColor("black");
        doc.text(`Reimbursement Amount: ${reimbursementAmount || "N/A"}`);
        doc.moveDown(2);

        // --- Section 4: Approved By (Official Use) ---
        doc.fontSize(14).fillColor("#1a237e").text("4. Approved By (Official Use)", {
            underline: true,
        });
        doc.moveDown();
        doc.fontSize(12).fillColor("black");
        doc.text(`Medical Assessor Name: ${medicalAssessorName || "N/A"}`);
        doc.text(`Medical Assessor Signature: ${medicalAssessorSignature || "N/A"}`);
        doc.moveDown();
        doc.text(`Claims Manager Name: ${claimsManagerName || "N/A"}`);
        doc.text(`Claims Manager Signature: ${claimsManagerSignature || "N/A"}`);
        doc.moveDown(2);

        // --- Section 5: Required Supporting Documents ---
        doc.fontSize(14).fillColor("#1a237e").text("5. Required Supporting Documents", {
            underline: true,
        });
        doc.moveDown();
        doc.fontSize(12).fillColor("black");
        doc.text(`Burial Permit: ${burialPermit ? "✓ Provided" : "✗ Missing"}`);
        doc.text(`Copy of Deceased’s ID: ${deceasedIDCopy ? "✓ Provided" : "✗ Missing"}`);
        doc.text(`Copy of Claimant’s ID: ${claimantIDCopy ? "✓ Provided" : "✗ Missing"}`);
        doc.text(`Bank / M-Pesa Details: ${bankMpesaDetails ? "✓ Provided" : "✗ Missing"}`);
        doc.moveDown(2);

        // --- Section 6: Privacy Notice & Consent ---
        doc.fontSize(14).fillColor("#1a237e").text("6. Privacy Notice & Consent", {
            underline: true,
        });
        doc.moveDown();
        doc.fontSize(12).fillColor("black");
        doc.text(
            `Consent to marketing communication: ${consentMarketing ? "Yes" : "No"}`
        );
        doc.text(
            `Consent for processing minor’s data: ${consentMinor ? "Yes" : "No"}`
        );
        doc.moveDown();
        doc.text(`Date: ${privacyDate || "N/A"}`);
        doc.text(`Signature of Beneficiary: ${privacySignature || "N/A"}`);
        doc.moveDown(2);

        // Footer watermark + page numbers
        const range = doc.bufferedPageRange();
        for (let i = 0; i < range.count; i++) {
            doc.switchToPage(i);
            doc.fontSize(8).fillColor("gray")
                .text("Birdview Insurance — Confidential", 50, doc.page.height - 40, {
                    align: "center",
                });
            doc.text(`Page ${i + 1} of ${range.count}`, 50, doc.page.height - 30, {
                align: "right",
            });
        }

        doc.end();
        const pdfBuffer = await streamToBuffer(doc);

        // 2. Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: "mail5016.site4now.net",
            port: 465,
            secure: true,
            auth: {
                user: "Claims@birdviewinsurance.com",
                pass: "B!rdv!ew@2024",
            },
        });

        // 3. Send Email with PDF
        await transporter.sendMail({
            from: `"Birdview Claims" <Claims@birdviewinsurance.com>`,
            to: "claims@birdviewinsurance.com",
            subject: "Last Expense Claim Form Submitted",
            text: `A new Last Expense Claim Form has been submitted.\n\nMember: ${memberName}`,
            attachments: [
                {
                    filename: `Last_Expense_Claim_${memberName}.pdf`,
                    content: pdfBuffer,
                },
            ],
        });

        res
            .status(200)
            .json({ success: true, message: "Last Expense Claim submitted ✅" });
    } catch (error) {
        console.error("❌ Error in Last Expense claim API:", error);
        res.status(500).json({ error: "Error processing claim" });
    }
}
