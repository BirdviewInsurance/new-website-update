import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as XLSX from 'xlsx';
import path from 'path';

// --- Types ---
type SheetMatrix = (string | number | null)[][];

export interface SubAgentFormForm {
  principal_id: string;
  email: string;
  first_name: string;
  middle_name: string;
  surname: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      principal_id,
      first_name,
      middle_name,
      surname,
      email,
    } = req.body;

    if (!principal_id || !first_name || !surname || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subAgentPayload = {
      principal_id,
      first_name,
      middle_name,
      surname,
      email,
    };

    const response = await fetch('https://snownet-core-server.onrender.com/api/underwriting/collaborator/subagent/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subAgentPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ API Error:', data);
      return res.status(response.status).json({ error: data?.error || 'Failed to submit sub-agent' });
    }

    // Excel Handling
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, 'sub_agents.xlsx');
    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;

    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      worksheet = workbook.Sheets['SubAgents'] || XLSX.utils.aoa_to_sheet([
        ['Principal ID', 'First Name', 'Middle Name', 'Surname', 'Email']
      ]);
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([
        ['Principal ID', 'First Name', 'Middle Name', 'Surname', 'Email']
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'SubAgents');
    }

    const existingData: SheetMatrix = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as SheetMatrix;
    existingData.push([
      principal_id, first_name, middle_name, surname, email
    ]);
    workbook.Sheets['SubAgents'] = XLSX.utils.aoa_to_sheet(existingData);

    const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await fs.writeFile(filePath, updatedBuffer);

    const fileUrl = `https://www.birdviewmicroinsurance.com/sub_agents.xlsx`;

    // Email Team
    const transporter = nodemailer.createTransport({
      host: 'mail5016.site4now.net',
      port: 465,
      secure: true,
      auth: {
        user: "customerservice@birdviewinsurance.com",
        pass: "B!rdv!ew@2024",
      },
      logger: true,
      debug: true,
    });

    const mailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: ['Gkangwana@birdviewinsurance.com', 'pkihuria@birdviewinsurance.com', 'Akinyanjui@birdviewinsurance.com'],
      subject: `New Sub Agent - ${first_name} ${surname}`,
      text: `A new sub-agent has been submitted. Download the updated list:\n${fileUrl}`,
      attachments: [
        {
          filename: 'sub_agents.xlsx',
          content: updatedBuffer,
        }
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to team");
    } catch (emailError: any) {
      console.error("⚠️ Email failed to send:", emailError);
      const pendingEmailsPath = path.join(publicDir, 'pending_subagent_emails.json');
      const pendingEmailsContent = await fs.readFile(pendingEmailsPath, 'utf-8').catch(() => '[]');
      const pendingEmails: any[] = JSON.parse(pendingEmailsContent);
      pendingEmails.push(mailOptions);
      await fs.writeFile(pendingEmailsPath, JSON.stringify(pendingEmails, null, 2));
      return res.status(202).json({ message: 'Sub-agent submitted, email pending', fileUrl });
    }

    res.status(200).json({ message: 'Sub-agent submitted successfully!', data, fileUrl });
  } catch (error: any) {
    console.error('❌ Unexpected Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}