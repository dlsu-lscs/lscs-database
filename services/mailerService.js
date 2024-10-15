const nodemailer = require('nodemailer');

// Setup Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password,
  },
});

// Service to send email with the API key
async function sendEmail(recipientEmail, apiKey) {
  try {
    let info = await transporter.sendMail({
      from: `"LSCS Database API Key" <${process.env.SMTP_USER}>`, // sender address
      to: recipientEmail, // receiver's email
      subject: '[LSCS] Your LSCS Database API Key', // Subject line
      text: `This is your LSCS Database API Key: ${apiKey}\n\nIf you did not make this request, please contact your Vice President`, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
