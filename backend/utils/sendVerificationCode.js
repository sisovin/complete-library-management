const nodemailer = require('nodemailer');
const crypto = require('crypto');
const logger = require('../config/logger.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

const sendVerificationCode = async (to, name, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Verification Code',
    html: `
      <h1>Verification Code</h1>
      <p>Hi ${name},</p>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>Please use this code to verify your account.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Verification code sent to ${to}`);
  } catch (error) {
    logger.error('Error sending verification code', error);
  }
};

module.exports = {
  generateVerificationCode,
  sendVerificationCode,
};
