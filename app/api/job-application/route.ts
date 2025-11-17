import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Extract form fields
    const fullname = formData.get("fullname")?.toString();
    const email = formData.get("email")?.toString();
    const position = formData.get("position")?.toString();
    const coverLetter = formData.get("coverLetter")?.toString();
    const resumeFile = formData.get("resume") as File | null;

    // Validate fields
    if (!fullname || !email || !position || !resumeFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > maxFileSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Save resume file with timestamp
    const timestamp = Date.now();
    const originalFilename = resumeFile.name || "resume";
    const fileExtension = originalFilename.split(".").pop() || "";
    const newFilename = `${timestamp}-${originalFilename}`;
    const newPath = path.join(uploadDir, newFilename);

    // Convert File to Uint8Array and save
    const arrayBuffer = await resumeFile.arrayBuffer();
    await fs.writeFile(newPath, new Uint8Array(arrayBuffer));

    // You can save this data to a database here or send an email notification.

    return NextResponse.json({
      message: "Application submitted successfully!",
      filename: newFilename,
    });
  } catch (error) {
    console.error("Error handling form data:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
