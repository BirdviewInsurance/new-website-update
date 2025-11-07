import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as XLSX from 'xlsx';
import path from 'path';


export interface IntermediaryFormForm {
  account_name: number;
  account_number: number;
  bank_branch: string;
  bank_name: string;
  city: string;
  company_name: string;
  company_number: string;
  intermediary_type: string;
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
  title: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      intermediary_type, title, firstname, middlename, lastname,
      gender, mobileno, postal_address, idtype, idno, pin_no,
      dateofbirth, country, city, eimail, company_name, company_number,
      bank_name, account_name, bank_branch, account_number
    } = req.body;

    const isValidDate = (date: string): boolean => {
      const parsed: Date = new Date(date);
      return parsed instanceof Date && !isNaN(parsed.getTime());
    };

    const cleanDateOfBirth = isValidDate(dateofbirth) ? new Date(dateofbirth).toISOString().split('T')[0] : null;

    const agentPayload = {
      intermidiary_type: intermediary_type,
      title,
      first_name: firstname,
      middle_name: middlename,
      surname: lastname,
      dob: cleanDateOfBirth,  // ✅ Date fixed
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

    // 📤 Submit to main API
    const primaryResponse = await fetch('https://snownet-core-server.onrender.com/api/underwriting/collaborator/agents/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentPayload),
    });

    const primaryData = await primaryResponse.json();
    if (!primaryResponse.ok) {
      console.error('❌ Main API Error:', primaryData);
      return res.status(primaryResponse.status).json({ error: primaryData?.error || 'Failed to submit agent' });
    }

    // 📤 If Broker, also submit to Broker endpoint
    if (intermediary_type === 'Broker') {
      await fetch('https://snownet-core-server.onrender.com/api/underwriting/collaborator/brokers/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentPayload),
      });
    }

    // 📁 File management
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const filePath = path.join(publicDir, 'intermediary_data.xlsx');
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    let workbook;
    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    } else {
      workbook = XLSX.utils.book_new();
    }

    let worksheet = workbook.Sheets[intermediary_type];
    if (!worksheet) {
      const headers = [
        'Title', 'First Name', 'Middle Name', 'Last Name', 'Gender', 'Mobile No', 'Postal Address',
        'ID Type', 'ID No', 'PIN No', 'DOB', 'Country', 'City', 'Email',
        'Company Name', 'Company Number', 'Bank Name', 'Account Name', 'Bank Branch', 'Account Number'
      ];
      worksheet = XLSX.utils.aoa_to_sheet([headers]);
      XLSX.utils.book_append_sheet(workbook, worksheet, intermediary_type);
    }

    const existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    existingData.push([
      title, firstname, middlename, lastname, gender, mobileno, postal_address,
      idtype, idno, pin_no, dateofbirth, country, city, eimail,
      company_name, company_number, bank_name, account_name, bank_branch, account_number
    ]);
    workbook.Sheets[intermediary_type] = XLSX.utils.aoa_to_sheet(existingData);

    const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await fs.writeFile(filePath, updatedBuffer);

    const fileUrl = `https://www.birdviewmicroinsurance.com/intermediary_data.xlsx`;

    // 📧 Email Setup
    const emailMap = {
      "Agent": ["omenjeri@birdviewinsurance.com", "jgatwiri@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
      "Broker": ["omenjeri@birdviewinsurance.com", "jgatwiri@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
      "Diaspora Agent": ["akinyanjui@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"],
      "Recruitment Agent": ["Smirie@birdviewinsurance.com", "Pkiabi@birdviewinsurance.com", "DGikuma@birdviewinsurance.com"]
    };

    const subjectMap = {
      "Agent": "New Agent Submissions",
      "Broker": "New Broker Submissions",
      "Diaspora Agent": "New Diaspora Agent Submission",
      "Recruitment Agent": "New Recruitment Agent Submission"
    };

    type IntermediaryType = keyof typeof emailMap;
    const recipients = emailMap[intermediary_type as IntermediaryType] || [];
    const subject = subjectMap[intermediary_type as IntermediaryType] || "New Intermediary Submission";

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

    const singleSheetBuffer = XLSX.write({
      SheetNames: [intermediary_type],
      Sheets: { [intermediary_type]: workbook.Sheets[intermediary_type] }
    }, { bookType: 'xlsx', type: 'buffer' });

    const mailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: recipients,
      subject: subject,
      text: `A new submission has been made under ${intermediary_type}. You can download the full data sheet here:\n${fileUrl}`,
      attachments: [
        {
          filename: `${intermediary_type.replace(/\s/g, '_')}_submissions.xlsx`,
          content: singleSheetBuffer,
        }
      ]
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("⚠️ Email failed:", emailError);
      const pendingPath = path.join(publicDir, 'pending_emails.json');
      let pending = await fs.readFile(pendingPath, 'utf-8').catch(() => '[]');
      const pendingEmails = JSON.parse(pending);
      pendingEmails.push(mailOptions);
      await fs.writeFile(pendingPath, JSON.stringify(pendingEmails, null, 2));
      return res.status(202).json({ message: 'Submitted, email pending', fileUrl });
    }

    res.status(200).json({ message: 'Intermediary submitted successfully!', data: primaryData, fileUrl });

  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}