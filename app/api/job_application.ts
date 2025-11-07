import type { NextApiRequest, NextApiResponse } from "next";
// pages/api/agent-form.js

import fs from "fs";
import path from "path";

import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "/public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);

        return res.status(500).json({ error: "Error parsing the form" });
      }

      try {
        const { fullname, email, position, coverLetter } = fields;
        const resumeFile = files.resume;

        // Validate fields
        if (!fullname || !email || !position || !resumeFile) {
          return res.status(400).json({ error: "All fields are required" });
        }

        // Rename resume with a timestamp
        const resume = Array.isArray(resumeFile) ? resumeFile[0] : resumeFile;
        const newFilename = `${Date.now()}-${resume.originalFilename}`;
        const newPath = path.join(uploadDir, newFilename);

        fs.renameSync(resume.filepath, newPath);

        // You can save this data to a database here or send an email notification.

        return res.status(200).json({
          message: "Application submitted successfully!",
          filename: newFilename,
        });
      } catch (error) {
        console.error("Error handling form data:", error);

        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
