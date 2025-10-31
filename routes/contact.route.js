const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// POST route for contact form
router.post("/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create transporter (using Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,   // your admin email
        pass: process.env.SMTP_PASS,    // app password (not your Gmail password)
      },
    });

    const mailOptions = {
      from: `"Website Inquiry" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry: ${subject}`,
        html: `
      <div style="background-color:#ffff; padding:40px 20px; font-family: 'Poppins', Arial, sans-serif; color:#f8f8f8;">
        <div style="max-width:600px; margin:0 auto; background:linear-gradient(180deg,#111,#000); border:1px solid #d4af37; border-radius:12px; box-shadow:0 0 15px rgba(212,175,55,0.3); overflow:hidden;">
          
          <div style="background:#d4af37; color:#000; text-align:center; padding:18px 10px;">
            <h2 style="margin:0; font-weight:700; letter-spacing:1px;">💎 Shiv Shakti Jewellers</h2>
            <p style="margin:5px 0 0; font-size:14px;">Elegance in Every Shine</p>
          </div>

          <div style="padding:30px;">
            <h3 style="color:#d4af37; font-weight:600; margin-bottom:15px;">New Inquiry Details</h3>
            
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="color:#d4af37; font-weight:500; padding:8px 0;">👤 Name:</td>
                <td style="color:#f8f8f8;">${name}</td>
              </tr>
              <tr>
                <td style="color:#d4af37; font-weight:500; padding:8px 0;">📞 Phone:</td>
                <td style="color:#f8f8f8;">${phone}</td>
              </tr>
              <tr>
                <td style="color:#d4af37; font-weight:500; padding:8px 0;">✉️ Email:</td>
                <td style="color:#f8f8f8;">${email}</td>
              </tr>
              <tr>
                <td style="color:#d4af37; font-weight:500; padding:8px 0;">💬 Subject:</td>
                <td style="color:#f8f8f8;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top:25px; background-color:#1a1a1a; border-left:4px solid #d4af37; padding:15px; border-radius:8px;">
              <p style="color:#f8f8f8; font-size:15px; line-height:1.6; margin:0;">${message}</p>
            </div>

            <div style="margin-top:30px; text-align:center;">
              <a href="http://localhost:5000/" style="background:#d4af37; color:#000; text-decoration:none; padding:12px 25px; border-radius:25px; font-weight:600; letter-spacing:0.5px; display:inline-block;">
                Visit Website
              </a>
            </div>
          </div>

          <div style="background:#0d0d0d; color:#aaa; text-align:center; font-size:12px; padding:15px;">
            <p style="margin:0;">© ${new Date().getFullYear()} Shiv Shakti Jewellers. All Rights Reserved.</p>
            <p style="margin:5px 0 0;">Crafted with 💛 and precision in every piece.</p>
          </div>
        </div>
      </div>
      `
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

module.exports= router;
