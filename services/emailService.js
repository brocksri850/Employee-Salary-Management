const nodemailer = require('nodemailer');
const constants = require('../utils/constants');

// Setup Nodemailer transporter

const transporter = nodemailer.createTransport({
  host: constants.Mail.smtp.host,
  auth: {
    user: constants.Mail.smtp.user,
    pass: constants.Mail.smtp.password
  }
});

// Send welcome email to new employee
exports.sendWelcomeEmail = async (email, name) => {
  try {
    // Define email options
    const mailOptions = {
      from: 'srisandystar@gmail.com',
      to: email,
      subject: 'Welcome to the Company!',
      html: `
        <p>Hello ${name},</p>
        <p>Welcome to our company! We're excited to have you on board.</p>
        <p>Best regards,</p>
        <p>The Management Team</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
    
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
  }
};
