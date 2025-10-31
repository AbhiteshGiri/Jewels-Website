// const User = require('../models/User.model');
// const TempOtp = require('../models/TempOtp.model');
// const bcrypt = require('bcrypt');
// const otpGenerator = require('otp-generator');
// const sendOtp = require('../utils/sendOtp');
// const generateToken = require('../utils/generateToken');
// const logger = require('../utils/logger');
// const { validationResult } = require('express-validator');
// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");
// const nodemailer = require("nodemailer");


// async function createTempOtp({ email, type, payload = null, ttlSeconds = 300 }) {
//   const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
//   const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
//   await TempOtp.findOneAndUpdate({ email, type }, { email, otp, type, payload, expiresAt }, { upsert: true, new: true, setDefaultsOnInsert: true });
//   return otp;
// }

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_USER, // your Gmail
//     pass: process.env.SMTP_PASS, // app password
//   },
// });


// exports.signupRequest = async (req, res) => {
//   try {
//     // validation handled in route
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { name, email, phone, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already used' });

//     const hashed = await bcrypt.hash(password, 10);
//     const payload = { name, email, phone, password: hashed };
//     const otp = await createTempOtp({ email, type: 'signup', payload });
//     await sendOtp(email, otp);

//     return res.status(200).json({
//   success: true,
//   message: 'OTP sent to email',
//   email // pass email to frontend to verify OTP
// });


//   } catch (err) { logger.error('signupRequest error', { error: err }); res.status(500).json({ message: 'Server error' }); }
// };

// exports.verifySignup = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const temp = await TempOtp.findOne({ email, type: 'signup' });
//     if (!temp || temp.otp !== otp)
//       return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

//     const payload = temp.payload;
//     const user = await User.create({
//       name: payload.name,
//       email: payload.email,
//       phone: payload.phone,
//       password: payload.password,
//       role: 'customer'
//     });

//     await TempOtp.deleteOne({ email, type: 'signup' });

//     const token = generateToken(user._id, user.role);
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'Lax'
//     });

//     return res.json({
//       success: true,
//       message: 'Signup complete',
//       token
//     });
//   } catch (err) {
//     console.error('verifySignup error:', err);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


// exports.loginRequest = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Missing' });

//     if (email === process.env.ADMIN_EMAIL) {
//       if (password !== process.env.ADMIN_PASS) return res.status(401).json({ message: 'Invalid admin credentials' });
//       const otp = await createTempOtp({ email, type: 'admin_login', payload: { role: 'admin' } });
//       await sendOtp(email, otp);
//       return res.json({ message: 'Admin OTP sent' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'No account' });
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = generateToken(user._id, user.role);
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
//     return res.json({ message: 'Logged in', token });
//   } catch (err) { logger.error('loginRequest error', { error: err }); res.status(500).json({ message: 'Server error' }); }
// };

// exports.verifyLoginOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const temp = await TempOtp.findOne({ email, type: 'admin_login' });
//     if (!temp || temp.otp !== otp) return res.status(400).json({ message: 'Invalid or expired OTP' });

//     const token = generateToken(process.env.ADMIN_EMAIL, 'admin');
//     await TempOtp.deleteOne({ email, type: 'admin_login' });
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
//     return res.json({ message: 'Admin logged in', token });
//   } catch (err) { logger.error('verifyLoginOtp error', { error: err }); res.status(500).json({ message: 'Server error' }); }
// };


// // Logout Controller
// exports.logout = (req, res) => {
//   res.cookie("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // true if using HTTPS
//     sameSite: "Lax",
//     expires: new Date(0),
//     path: "/"
//   });
//   return res.json({ success: true, message: "Logged out successfully" });
// };


// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "No account found with this email" });

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenExpire = Date.now() + 10 * 60 * 1000; // valid for 10 minutes

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpire = resetTokenExpire;
//     await user.save();

//     const resetUrl = `http://localhost:5000/reset-password.html?token=${resetToken}`;

//     // Send email
//     await transporter.sendMail({
//       to: user.email,
//       subject: "Password Reset Request",
//       html: `
//         <h3>Password Reset Request</h3>
//         <p>You requested to reset your password.</p>
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetUrl}">${resetUrl}</a><br/><br/>
//         <p>This link will expire in 10 minutes.</p>
//       `,
//     });

//     res.json({ success: true, message: "Password reset link sent to your email" });
//   } catch (err) {
//     console.error("Forgot Password Error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;

//     if (!token || !password)
//       return res.status(400).json({ message: "Token and new password are required" });

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.json({ success: true, message: "Password reset successful. Please login." });
//   } catch (err) {
//     console.error("Reset Password Error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };




// auth.controller.js
const User = require('../models/User.model');
const TempOtp = require('../models/TempOtp.model');
const otpGenerator = require('otp-generator');
const sendOtp = require('../utils/sendOtp'); // kept (not used) to avoid breaking other code
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { response } = require('express');

// Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  },
});

// Helper: send HTML mail
async function sendHtmlMail(to, subject, html) {
  const mailOptions = {
    from: `"Shiv Shakti Jewellers" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

// Beautiful Black & Gold HTML templates
function htmlTemplateWrapper(title, bodyHtml) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#0f0f0f;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f0f0f;padding:30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#111;background-image: linear-gradient(180deg,#111 0%, #0f0f0f 100%);border-radius:12px;border:2px solid #d4af37;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;text-align:center;color:#ffd700;">
                <h1 style="margin:0;font-family:Arial, Helvetica, sans-serif;font-size:22px;letter-spacing:1px;">Shiv Shakti Jewellers</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px 10px 28px;color:#ddd;font-family:Arial, Helvetica, sans-serif;">
                ${bodyHtml}
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px 28px 28px;text-align:center;color:#c9a84a;font-family:Arial, Helvetica, sans-serif;">
                <small style="color:#c9a84a">© ${new Date().getFullYear()} Shiv Shakti Jewellers</small>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function signupOtpHtml(otp) {
  const body = `
    <h2 style="color:#ffd700;margin:0 0 10px 0;">Your verification code</h2>
    <p style="color:#ddd;margin:0 0 18px 0;">Use the code below to verify your email for creating your account. This code expires in 5 minutes.</p>
    <div style="display:flex;justify-content:center;margin:18px 0;">
      <span style="font-size:28px;padding:12px 18px;border-radius:8px;background:#111;border:1px solid #d4af37;color:#ffd700;font-weight:700;letter-spacing:4px;">${otp}</span>
    </div>
    <p style="color:#bbb;margin-top:18px;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
  `;
  return htmlTemplateWrapper('Verify your email', body);
}

function adminLoginOtpHtml(otp) {
  const body = `
    <h2 style="color:#ffd700;margin:0 0 10px 0;">Admin login OTP</h2>
    <p style="color:#ddd;margin:0 0 18px 0;">Use the code below to finish admin login. This code expires in 5 minutes.</p>
    <div style="display:flex;justify-content:center;margin:18px 0;">
      <span style="font-size:28px;padding:12px 18px;border-radius:8px;background:#111;border:1px solid #d4af37;color:#ffd700;font-weight:700;letter-spacing:4px;">${otp}</span>
    </div>
    <p style="color:#bbb;margin-top:18px;font-size:13px;">If you didn't request this, please contact the system administrator.</p>
  `;
  return htmlTemplateWrapper('Admin Login OTP', body);
}

function forgotPasswordHtml(resetUrl) {
  const body = `
    <h2 style="color:#ffd700;margin:0 0 10px 0;">Reset your password</h2>
    <p style="color:#ddd;margin:0 0 18px 0;">We received a request to reset your account password. Click the button below to set a new password. The link is valid for 10 minutes.</p>
    <div style="text-align:center;margin:20px 0;">
      <a href="${resetUrl}" target="_blank" style="display:inline-block;padding:12px 22px;border-radius:8px;background:linear-gradient(90deg,#d4af37,#b8860b);color:#111;font-weight:700;text-decoration:none;">Reset Password</a>
    </div>
    <p style="color:#bbb;margin-top:18px;font-size:13px;">If you did not request a password reset, please ignore this email.</p>
    <hr style="border:none;border-top:1px solid #1a1a1a;margin:18px 0;">
    <p style="color:#c9a84a;font-size:12px;margin:0;">Shiv Shakti Jewellers</p>
  `;
  return htmlTemplateWrapper('Password reset', body);
}

// createTempOtp unchanged
async function createTempOtp({ email, type, payload = null, ttlSeconds = 300 }) {
  const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
  await TempOtp.findOneAndUpdate({ email, type }, { email, otp, type, payload, expiresAt }, { upsert: true, new: true, setDefaultsOnInsert: true });
  return otp;
}

// ---------------- EXISTING CONTROLLERS (kept & improved) ----------------

exports.signupRequest = async (req, res) => {
  try {
    // validation handled in route
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);

    // 🟢 Added: support for mobile & profile image
    const mobile = req.body.mobile || phone; 
    const image = req.file ? `/uploads/profile/${req.file.filename}` : null;
    console.log(mobile,image)
    const payload = { name, email, mobile,image, password: hashed };

    // create and store OTP
    const otp = await createTempOtp({ email, type: 'signup', payload });
    console.log(otp)
    // send OTP email using HTML template
    try {
      await sendHtmlMail(email, 'Verify your email - Shiv Shakti Jewellers', signupOtpHtml(otp));
    } catch (mailErr) {
      logger.error('signup OTP mail error', { error: mailErr });
      // fallback to existing sendOtp util (if you prefer)
      try { await sendOtp(email, otp); } catch (_) {}
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent to email',
      email // pass email to frontend to verify OTP
    });

  } catch (err) {
    logger.error('signupRequest error', { error: err });
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.verifySignup = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const temp = await TempOtp.findOne({ email, type: 'signup' });
    console.log(temp)
    if (!temp || temp.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    const payload = temp.payload;
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile || '', // 🟢 updated
      image: payload.image || '',   // 🟢 updated
      password: payload.password,
      role: 'customer'
    });

    await TempOtp.deleteOne({ email, type: 'signup' });

    const token = generateToken(user._id, user.role);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', path: '/' });

    return res.json({ success: true, message: 'Signup complete', token });
  } catch (err) {
    logger.error('verifySignup error', { error: err });
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.loginRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing' });

    
    if (email === process.env.ADMIN_EMAIL) {
      if (password !== process.env.ADMIN_PASS)
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });

      const otp = await createTempOtp({ email, type: 'admin_login', payload: { role: 'admin' } });

      try {
        await sendHtmlMail(email, 'Admin login OTP - Shiv Shakti Jewellers', adminLoginOtpHtml(otp));
        return res.json({ success: true, redirect: './otp.html' });

      } catch (mailErr) {
        logger.error('admin OTP mail error', { error: mailErr });
        try {
          await sendOtp(email, otp);
        } catch (_) {}
        return res.status(200).json({ success: true, message: 'Admin OTP sent (fallback)' }); // ✅ RETURN HERE TOO
      }
    }

    // 🟢 USER LOGIN FLOW
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'No account' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user._id, user.role);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: '/',
    });

    return res.json({ success: true, message: 'Logged in', token });
  } catch (err) {
    logger.error('loginRequest error', { error: err });
    return res.status(500).json({ success: false, message: 'Server error' }); // ✅ Add return here too
  }
};

exports.verifyLoginOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    let email=process.env.ADMIN_EMAIL;
    const temp = await TempOtp.findOne({ email, type: 'admin_login' });
    if (!temp || temp.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    const token = generateToken(process.env.ADMIN_EMAIL, 'admin');
    await TempOtp.deleteOne({ email, type: 'admin_login' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', path: '/' });
    return res.json({ success: true, message: 'Admin logged in', redirect:"/admin" });
  } catch (err) {
    logger.error('verifyLoginOtp error', { error: err });
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    expires: new Date(0),
    path: '/'
  });
  return res.json({ success: true, message: 'Logged out successfully' });
};

// ---------------- FORGOT / RESET PASSWORD ----------------

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'No account found with this email' });

    // Generate secure reset token (store hashed)
    const resetTokenPlain = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetTokenPlain).digest('hex');
    const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = resetTokenExpire;
    await user.save();

    // Build reset URL using CLIENT_URL if provided, else fallback
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5500/public';
    const resetUrl = `${clientUrl}/resetpass.html?token=${resetTokenPlain}`;

    // Send reset email
    try {
      await sendHtmlMail(user.email, 'Reset your password - Shiv Shakti Jewellers', forgotPasswordHtml(resetUrl));
    } catch (mailErr) {
      logger.error('forgot password mail error', { error: mailErr });
      return res.status(500).json({ success: false, message: 'Failed to send reset email' });
    }

    return res.json({ success: true, message: 'Password reset link sent to your email' });
  } catch (err) {
    logger.error('Forgot Password Error:', { error: err });
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ success: false, message: 'Token and new password are required' });

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.json({ success: true, message: 'Password reset successful. Please login.' });
  } catch (err) {
    logger.error('Reset Password Error:', { error: err });
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
