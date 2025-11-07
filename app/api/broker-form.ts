import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as XLSX from 'xlsx';
import path from 'path';

export interface BrokerFormForm {
  account_name: string;
  account_number: number;
  bank_branch: string;
  bank_name: string;
  city: string;
  company_name: string;
  company_number: string;
  intermediary_type: string;
  country: number;
  dateofbirth: string;
  email: string;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Destructure request body
    const {
      intermediary_type,
      title,
      firstname,
      middlename,
      lastname,
      gender,
      mobileno,
      postal_address,
      idtype,
      idno,
      pin_no,
      dateofbirth,
      country,
      city,
      email,
      company_name,
      company_number,
      bank_name,
      account_name,
      bank_branch,
      account_number
    } = req.body as BrokerFormForm;

    const sharedPayload = {
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
      occupation: intermediary_type,
      physical_address: 'N/A',
      mobile_no: mobileno,
      other_phone: '',
      email,
      id_type: idtype,
      company_name,
      commission: 10.0,
      bank_name,
      bank_account_name: account_name,
      bank_account_number: account_number,
      bank_branch,
      is_active: false
    };

    // Determine endpoint
    const agentEndpoint = 'https://snownet-core-server.onrender.com/api/underwriting/collaborator/agents/create/';
    const brokerEndpoint = 'https://snownet-core-server.onrender.com/api/underwriting/collaborator/brokers/create/';
    const submitUrl = intermediary_type === 'Broker' ? brokerEndpoint : agentEndpoint;

    const submissionPromise = fetch(submitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sharedPayload),
    });

    // --- Excel Logic ---
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });
    const filePath = path.join(publicDir, 'agent_data.xlsx');

    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;

    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (fileBuffer) {
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      worksheet = workbook.Sheets['Agent Data'] || XLSX.utils.aoa_to_sheet([
        [
          'Type', 'Title', 'First Name', 'Middle Name', 'Last Name', 'Gender', 'Mobile No',
          'Postal Address', 'ID Type', 'ID No', 'PIN No', 'DOB', 'Country', 'City', 'Email',
          'Company Name', 'Company Number', 'Bank Name', 'Account Name', 'Bank Branch', 'Account Number'
        ]
      ]);
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([
        [
          'Type', 'Title', 'First Name', 'Middle Name', 'Last Name', 'Gender', 'Mobile No',
          'Postal Address', 'ID Type', 'ID No', 'PIN No', 'DOB', 'Country', 'City', 'Email',
          'Company Name', 'Company Number', 'Bank Name', 'Account Name', 'Bank Branch', 'Account Number'
        ]
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Agent Data');
    }

    // Convert worksheet to 2D array, append new row
    const existingData: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    existingData.push([
      intermediary_type, title, firstname, middlename, lastname, gender, mobileno, postal_address,
      idtype, idno, pin_no, dateofbirth, country, city, email,
      company_name, company_number, bank_name, account_name, bank_branch, account_number
    ]);

    // Convert back to worksheet
    workbook.Sheets['Agent Data'] = XLSX.utils.aoa_to_sheet(existingData);
    const updatedBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    await fs.writeFile(filePath, updatedBuffer);

    // --- Email Logic ---
    const emailRecipients: Record<string, string[]> = {
      'Diaspora Agent': ['AKinyanjui@birdviewinsurance.com'],
      'Agent': ['Omenjeri@birdviewinsurance.com', 'Jgatwiri@birdviewinsurance.com'],
      'Broker': ['Omenjeri@birdviewinsurance.com', 'Jgatwiri@birdviewinsurance.com'],
      'Recruitment Agent': ['Smirie@birdviewinsurance.com']
    };

    const transporter = nodemailer.createTransport({
      host: 'mail5016.site4now.net',
      port: 465,
      secure: true,
      auth: {
        user: 'customerservice@birdviewinsurance.com',
        pass: 'B!rdv!ew@2024'
      }
    });

    const mailOptions = {
      from: '"Birdview Insurance" <customerservice@birdviewinsurance.com>',
      to: emailRecipients[intermediary_type] || [],
      subject: `New ${intermediary_type} Submission - ${firstname} ${lastname}`,
      text: `New ${intermediary_type} submitted. Download agent list:
https://www.birdviewmicroinsurance.com/agent_data.xlsx`,
      attachments: [
        { filename: 'agent_data.xlsx', content: updatedBuffer }
      ]
    };

    const [submitRes] = await Promise.all([
      submissionPromise,
      transporter.sendMail(mailOptions).catch(async (emailError) => {
        // Fallback: save pending emails
        const pendingPath = path.join(publicDir, 'pending_emails.json');
        const pending = await fs.readFile(pendingPath, 'utf-8').catch(() => '[]');
        const pendingArr = JSON.parse(pending) as typeof mailOptions[];
        pendingArr.push(mailOptions);
        await fs.writeFile(pendingPath, JSON.stringify(pendingArr, null, 2));
      })
    ]);

    const data = await submitRes.json();

    if (!submitRes.ok) {
      return res.status(submitRes.status).json({ error: data?.error || 'Failed to submit agent/broker' });
    }

    return res.status(200).json({ message: `${intermediary_type} submitted successfully!`, data });

  } catch (error) {
    console.error('❌ Internal Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
