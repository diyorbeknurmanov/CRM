const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendMail(toEmail, otp) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "pul yechish kodingiz",
      text: "",
      html: `
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pul yechish uchun tasdiqlash kodi</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
    <h2 style="color: #333333;">Pul yechish uchun tasdiqlash kodi</h2>
    <p style="font-size: 16px; color: #555555;">
      Hurmatli foydalanuvchi, hisobingizdan pul yechish uchun quyidagi tasdiqlash kodini kiriting. Ushbu kodni hech kimga bermang.
    </p>
    <div style="margin: 30px 0; display: inline-block; padding: 15px 25px; background-color: #f0f0f0; border-radius: 6px; font-size: 24px; letter-spacing: 5px; font-weight: bold; color: #333333;">
      ${otp}
    </div>
    <p style="font-size: 14px; color: #888888;">Ushbu kod 5 daqiqa davomida amal qiladi.</p>
    <p style="margin-top: 30px; font-size: 12px; color: #999999;">
      Agar bu harakat siz tomonidan qilinmagan bo‘lsa, iltimos, bu xatni e'tiborsiz qoldiring.
    </p>
  </div>
</body>
</html>

`,
    });
  }
}
let userMailService = new MailService();

module.exports = {
  userMailService,
};
