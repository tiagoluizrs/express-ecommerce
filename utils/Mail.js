require("dotenv").config();
const nodemailer = require("nodemailer");

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      port: process.env.EMAIL_PORT,
      host: process.env.EMAIL_SMTP,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });
  }

  async sendEmail(to, subject, html) {
    let data = {
      from: "tiago.silva@prof.infnet.edu.br",
      to,
      subject,
      html,
    };

    try {
      const result = await this.transporter.sendMail(data);
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

module.exports = Mail;