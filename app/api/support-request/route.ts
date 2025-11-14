import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// SMTP transporter
const transporter = nodemailer.createTransport({
    host: "mail5016.site4now.net",
    port: 465,
    secure: true, // true for 465
    auth: {
        user: "Customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
    },
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { name, email, phone, category, policyNumber, message } = data;

        // Validate required fields
        if (!name || !email || !phone || !category || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // --- Email to support team ---
        await transporter.sendMail({
            from: `"Support Request" <Customerservice@birdviewinsurance.com>`,
            to: ["Customerservice@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"], // support email
            subject: `New Support Request from ${name}`,
            html: `
                <h2>New Support Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Policy Number:</strong> ${policyNumber || "N/A"}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `,
        });

        // --- Confirmation email to user ---
        await transporter.sendMail({
            from: `"Birdview Insurance Support" <Customerservice@birdviewinsurance.com>`,
            to: email, // user's email
            subject: "Your Support Request Has Been Received",
            html: `
                <h2>Hi ${name},</h2>
                <p>Thank you for reaching out to Birdview Insurance. We have received your support request and our team will get back to you within one business day.</p>
                <h3>Your Request Details:</h3>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Policy Number:</strong> ${policyNumber || "N/A"}</p>
                <p><strong>Message:</strong><br/>${message}</p>
                <p>Best regards,<br/>Birdview Insurance Support Team</p>
            `,
        });

        return NextResponse.json({ message: "Support request sent successfully, confirmation email sent to user." });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send support request" },
            { status: 500 }
        );
    }
}
