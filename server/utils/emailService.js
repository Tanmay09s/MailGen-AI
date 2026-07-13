const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"MailGen AI" <${process.env.BREVO_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `<p>${options.message}</p>`,
    });

    console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Brevo Email Error:", error);
    throw error;
  }
};

module.exports = sendEmail;