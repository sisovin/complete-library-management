const welcomeEmail = (name) => `
  <h1>Welcome to the Library, ${name}!</h1>
  <p>We are excited to have you join our community. Enjoy exploring our vast collection of books and resources.</p>
`;

const passwordResetEmail = (name, resetLink) => `
  <h1>Password Reset Request</h1>
  <p>Hi ${name},</p>
  <p>We received a request to reset your password. Click the link below to reset your password:</p>
  <a href="${resetLink}">Reset Password</a>
  <p>If you did not request a password reset, please ignore this email.</p>
`;

const notificationEmail = (name, message) => `
  <h1>Library Notification</h1>
  <p>Hi ${name},</p>
  <p>${message}</p>
`;

module.exports = {
  welcomeEmail,
  passwordResetEmail,
  notificationEmail,
};
