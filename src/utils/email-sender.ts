import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';

dotenv.config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (email: string, subject: string, message: string = '', html: string = '') => {
  let emailInfo = await transporter.sendMail({
    from: `Carino <${process.env.MAIL_USER}>`,
    to: email,
    subject: subject,
    text: message,
    html: html,
  });
  return emailInfo;
};

export default sendEmail;
