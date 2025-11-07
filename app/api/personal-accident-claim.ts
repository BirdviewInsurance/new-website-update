import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

// Helper: Convert PDFKit stream → Buffer
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = req.body;
    const {
      insuredName,
      phone,
      address,
      occupation,
      age,
      accidentDate,
      accidentTime,
      accidentPlace,
      accidentDescription,
      injuries,
      previousInjury,
      confinedBed,
      confinedHouse,
      doctorDetails,
      pastTreatment,
      witnesses,
      otherInsurance,
      declarationDate,
      declarationName,
      declarationSignature,
      patientName,
      doctorName,
      medicalInjuries,
      firstConsultation,
      disabilityPeriod,
      disabilityAssessment,
      previousDefects,
      doctorSignature,
      qualifications,
      doctorPhone,
      medicalDate,
    } = formData;

    if (!insuredName) {
      return res.status(400).json({ error: "Insured Name is required" });
    }

    // 🎨 PDF Setup
    const doc = new PDFDocument({ margin: 50 });
    const primaryColor = "#1E3A8A"; // Birdview deep blue
    const secondaryColor = "#2563EB"; // Lighter blue for accents
    const gray = "#F3F4F6";

    // Header
    doc.rect(0, 0, doc.page.width, 80).fill(primaryColor);
    doc.fillColor("white").fontSize(22).text("Birdview Insurance", 50, 25);
    doc.moveDown(2);
    doc.fillColor("black");

    // Title
    doc
      .fontSize(18)
      .fillColor(secondaryColor)
      .text("Personal Accident Claim Form", { align: "center" });
    doc.moveDown(1.5);

    // 🔹 Section helper
    const drawSection = (title: string) => {
      doc
        .rect(50, doc.y, doc.page.width - 100, 25)
        .fillAndStroke(gray, primaryColor);
      doc
        .fillColor(primaryColor)
        .fontSize(14)
        .text(title, 60, doc.y - 18);
      doc.moveDown(2);
      doc.fillColor("black");
    };

    // Insured Details
    drawSection("Insured Details");
    doc
      .fontSize(12)
      .text(`Name of Insured: ${insuredName}`)
      .text(`Phone: ${phone || "N/A"}`)
      .text(`Address: ${address || "N/A"}`)
      .text(`Occupation: ${occupation || "N/A"}`)
      .text(`Age: ${age || "N/A"}`)
      .text(`Date of Accident: ${accidentDate || "N/A"}`)
      .text(`Time of Accident: ${accidentTime || "N/A"}`)
      .text(`Place of Accident: ${accidentPlace || "N/A"}`)
      .moveDown();

    // Accident Details
    drawSection("Accident Details");
    doc
      .fontSize(12)
      .text(`How did accident happen: ${accidentDescription || "N/A"}`)
      .text(`Injuries sustained: ${injuries || "N/A"}`)
      .text(`Previous injury: ${previousInjury || "N/A"}`)
      .text(`Period confined to bed: ${confinedBed || "N/A"}`)
      .text(`Period confined to house: ${confinedHouse || "N/A"}`)
      .text(`Doctor’s Details: ${doctorDetails || "N/A"}`)
      .text(`Past medical/surgical treatment: ${pastTreatment || "N/A"}`)
      .text(`Witnesses: ${witnesses || "N/A"}`)
      .text(`Other insurance claims: ${otherInsurance || "N/A"}`)
      .moveDown();

    // Declaration
    drawSection("Declaration");
    doc
      .fontSize(12)
      .text(`Date: ${declarationDate || "N/A"}`)
      .text(`Name: ${declarationName || "N/A"}`)
      .text(`Signature: ${declarationSignature || "N/A"}`)
      .moveDown();

    // Medical Certificate
    drawSection("Medical Certificate (Doctor)");
    doc
      .fontSize(12)
      .text(`Patient Name: ${patientName || "N/A"}`)
      .text(`Doctor Name & Address: ${doctorName || "N/A"}`)
      .text(`Injuries suffered: ${medicalInjuries || "N/A"}`)
      .text(`First Consultation: ${firstConsultation || "N/A"}`)
      .text(`Disability Period: ${disabilityPeriod || "N/A"}`)
      .text(`Disability Assessment: ${disabilityAssessment || "N/A"}`)
      .text(`Previous Defects: ${previousDefects || "N/A"}`)
      .text(`Doctor Signature: ${doctorSignature || "N/A"}`)
      .text(`Qualifications: ${qualifications || "N/A"}`)
      .text(`Doctor Phone: ${doctorPhone || "N/A"}`)
      .text(`Date: ${medicalDate || "N/A"}`)
      .moveDown();

    // Scale of Permanent Disablement
    doc.addPage();
    drawSection("Scale of Permanent Disablement Benefits");

    const scale = [
      ["Permanent Total Disability", "100%"],
      ["Total Paralysis", "100%"],
      ["Loss of use of two limbs", "100%"],
      ["Loss of use of one limb", "50%"],
      ["Loss of sight in both eyes", "100%"],
      ["Loss of remaining eye", "100%"],
      ["Loss of sight in one eye", "50%"],
      ["Loss of speech & hearing", "100%"],
      ["Loss of speech only", "50%"],
      ["Loss of hearing both ears", "75%"],
      ["Loss of hearing one ear", "40%"],
      ["Loss of use of both hands", "100%"],
      ["Loss of use of one hand", "50%"],
      ["Loss of one finger", "10%"],
      ["Loss of both feet", "100%"],
      ["Loss of one foot", "50%"],
      ["Loss of one toe", "10%"],
    ];

    const startX = 50;
    const startY = doc.y;
    const col1Width = 350;
    const col2Width = 100;
    const rowHeight = 25;

    // Table header
    doc
      .rect(startX, startY, col1Width + col2Width, rowHeight)
      .fill(primaryColor);
    doc
      .fillColor("white")
      .fontSize(12)
      .text("Disability", startX + 5, startY + 7);
    doc.text("% Payable", startX + col1Width + 5, startY + 7);
    doc.fillColor("black");

    // Rows
    let y = startY + rowHeight;

    scale.forEach((row: string[], i: number) => {
      const [disability, percent] = row;
      const fill = i % 2 === 0 ? "#ffffff" : "#f0f4ff";

      doc
        .rect(startX, y, col1Width + col2Width, rowHeight)
        .fill(fill)
        .stroke();
      doc
        .fillColor("black")
        .text(disability, startX + 5, y + 7, { width: col1Width - 10 });
      doc.text(percent, startX + col1Width + 5, y + 7, {
        width: col2Width - 10,
      });
      y += rowHeight;
    });

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

    // 3. Send Email
    await transporter.sendMail({
      from: "Claims@birdviewinsurance.com",
      to: "claims@birdviewinsurance.com",
      subject: "New Personal Accident Claim Submitted",
      text: `A new claim has been submitted by ${insuredName}. See attached PDF.`,
      attachments: [
        {
          filename: `Personal_Accident_Claim_${insuredName}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    res
      .status(200)
      .json({ success: true, message: "Claim submitted successfully ✅" });
  } catch (error: any) {
    console.error("❌ Error in claim API:", error);
    res.status(500).json({ error: "Error processing claim" });
  }
}
