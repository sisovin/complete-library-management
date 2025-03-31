const nodemailer = require('nodemailer');
const { welcomeEmail, passwordResetEmail, notificationEmail } = require('./emailTemplates');
const logger = require('../config/logger.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error('Error sending email', error);
  }
};

module.exports = {
  sendEmail,
  welcomeEmail,
  passwordResetEmail,
  notificationEmail,
};
