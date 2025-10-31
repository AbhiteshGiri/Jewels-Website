const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { body } = require('express-validator');
const generateToken=require('../utils/generateToken')
const multer=require('multer')
const path=require('path')
const fs=require("fs")
const productUploadPath = path.join(__dirname, '..', 'uploads', 'profile');
if (!fs.existsSync(productUploadPath)) fs.mkdirSync(productUploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, productUploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`),
});

const upload = multer({ storage });


// ---------------- Existing Routes ----------------
router.post(
  '/signup/request',
  upload.single('image'), // ✅ Parse form-data first
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('mobile').optional(), // ✅ Let mobile pass through even if not validated
  auth.signupRequest
);


router.post('/signup/verify', auth.verifySignup);

router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  auth.loginRequest
);

router.post('/login/verify', auth.verifyLoginOtp);

router.post("/logout", auth.logout);

// ---------------- Forgot Password Routes (Added) ----------------

// Send Reset Password Email
router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Valid email required'),
  auth.forgotPassword
);

// Verify reset token and reset password
router.post(
  '/reset-password',
  body('token').notEmpty().withMessage('Token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  auth.resetPassword
);

// ---------------- Google OAuth Routes ----------------
const passport = require('passport');

// ✅ Google Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Callback after Google login
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  async (req, res) => {
    try {
      // req.user comes from passport.deserializeUser
      const token = generateToken(req.user._id, req.user.role);

      // Set cookie
      res.cookie('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
      });

      // Redirect or send success response
      res.redirect('/'); // your frontend URL
    } catch (error) {
      console.error('Cookie set error:', error);
      res.redirect('/login');
    }
  }
);



module.exports = router;
