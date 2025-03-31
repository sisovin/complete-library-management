const nodemailer = require('nodemailer');
const { query } = require('../database/db');
const logger = require('../config/logger.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const notifyUsers = async () => {
  try {
    const result = await query('SELECT email FROM users WHERE notify = true');
    const emails = result.rows.map(row => row.email);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emails,
      subject: 'Library Notification',
      text: 'This is a notification from the library management system.',
    };

    await transporter.sendMail(mailOptions);
    logger.info('Notification emails sent successfully');
  } catch (error) {
    logger.error('Error sending notification emails', error);
  }
};

module.exports = notifyUsers;
