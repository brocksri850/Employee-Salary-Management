const nodemailer = require('nodemailer');
const constants = require('../utils/constants');

const sendMailFromData = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: constants.Mail.smtp.host,
      auth: {
        user: constants.Mail.smtp.user,
        pass: constants.Mail.smtp.password
      }
    });

    const mailOptions = {
      from: constants.Mail.smtp.user,
      to: data.to,
      subject: data.subject,
      html: data.bodyHtml
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error occurred while sending email:', error);
  }
};

module.exports = {
  sendMailFromData
};
