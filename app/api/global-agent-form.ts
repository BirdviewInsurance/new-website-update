import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as XLSX from 'xlsx';
import path from 'path';


export interface GlobalAgentFormForm {
  account_name: number;
  account_number: number;
  bank_branch: string;
  bank_name: string;
  city: string;
  company_name: string;
  company_number: string;
  title: string;
  country: number;
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
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      title, firstname, middlename, lastname,
      gender, mobileno, postal_address, idtype,
      idno, pin_no, dateofbirth, country,
      city, eimail, company_name, company_number,
      bank_name, account_name, bank_branch, account_number
    } = req.body;

    const agentPayload = {
      title,
      first_name: firstname,
      middle_name: middlename,
      surname: lastname,
      dob: dateofbirth,
      gender,
      nationality: 'Kenyan',
      country_of_residence: country,
      national_id_passport_no: idno,
      nhif: 'N/A',
      pin: pin_no,
      employer: company_name,
      postal_address,
      code: '00100',
      town: city,
      occupation: 'Agent',
      physical_address: 'N/A',
      mobile_no: mobileno,
      other_phone: '',
      email: eimail,
      id_type: idtype,
      company_name,
      commission: 10.0,
      bank_name,
      bank_account_name: account_name,
      bank_account_number: account_number,
      bank_branch,
      is_active: false
    };

    // Submit to external API
    const response = await fetch('https://snownet-core-server.onrender.com/api/underwriting/collaborator/agents/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ API Error:', data);
      return res.status(response.status).json({ error: data?.error || 'Failed to submit agent' });
    }

    // Excel appending
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, 'global_agent_data.xlsx');
    let workbook;
    let worksheet;

    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      worksheet = workbook.Sheets['Global Agent Data'] || XLSX.utils.aoa_to_sheet([
        ['Title', 'First Name', 'Middle Name', 'Last Name', 'Gender', 'Mobile No', 'Postal Address',
          'ID Type', 'ID No', 'PIN No', 'DOB', 'Country', 'City', 'Email',
          'Company Name', 'Company Number', 'Bank Name', 'Account Name', 'Bank Branch', 'Account Number']
      ]);
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([
        ['Title', 'First Name', 'Middle Name', 'Last Name', 'Gender', 'Mobile No', 'Postal Address',
          'ID Type', 'ID No', 'PIN No', 'DOB', 'Country', 'City', 'Email',
          'Company Name', 'Company Number', 'Bank Name', 'Account Name', 'Bank Branch', 'Account Number']
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Global Agent Data');
    }

    const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    existingData.push([
      title, firstname, middlename, lastname, gender, mobileno, postal_address,
      idtype, idno, pin_no, dateofbirth, country, city, eimail,
      company_name, company_number, bank_name, account_name, bank_branch, account_number
    ]);
    workbook.Sheets['Global Agent Data'] = XLSX.utils.aoa_to_sheet(existingData);

    const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await fs.writeFile(filePath, updatedBuffer);

    const fileUrl = `https://www.birdviewmicroinsurance.com/global_agent_data.xlsx`;

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
      subject: `New Agent Submission - ${firstname} ${lastname}`,
      text: `A new agent has been submitted. Download the updated agent list here:\n${fileUrl}`,
      attachments: [
        {
          filename: 'global_agent_data.xlsx',
          content: updatedBuffer,
        }
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to team");
    } catch (emailError) {
      console.error("⚠️ Email failed to send:", emailError);
      const pendingEmailsPath = path.join(publicDir, 'pending_emails.json');
      let pendingEmails: any[] = JSON.parse(await fs.readFile(pendingEmailsPath, 'utf-8').catch(() => '[]'));
      pendingEmails.push(mailOptions);
      await fs.writeFile(pendingEmailsPath, JSON.stringify(pendingEmails, null, 2));
      return res.status(202).json({ message: 'Agent submitted, email pending', fileUrl });
    }

    res.status(200).json({ message: 'Agent submitted successfully!', data, fileUrl });
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}