const nodeMailer = require("nodemailer");

const adminEmail = process.env.adminEmail;
const adminPassword = process.env.adminPassword;
const mailHost = "smtp.office365.com";
const mailPort = 587;
const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });
  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(options);
};

module.exports = {
  sendMail: sendMail,
};
