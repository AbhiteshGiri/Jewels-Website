require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { adminOnly } = require("./middleware/auth.middleware.js");
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const postRoutes = require('./routes/post.routes');
const profileRoutes = require('./routes/profile.routes');
const productRoutes = require('./routes/product.route');
const product = require('./controllers/product.controller.js');
const contactRoute = require("./routes/contact.route.js");
const userProfile = require('./routes/user.route.js');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Google Authentication Fix
const passport = require('passport');
const session = require('express-session');
require('./config/googleAuth');
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/otp', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "otp.html"));
});

// GOOGLE ROUTES
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signupLogin.html" }),
  (req, res) => {
    res.redirect("/index.html");
  }
);

const __dirnamePath = __dirname;

// ✅ Serve Static Frontend Files
app.use(express.static(path.join(__dirnamePath, 'public')));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// ✅ Allow embedding external (Google) images
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});


app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup
const allowed = ['https://b5zc3hzh-5000.inc1.devtunnels.ms/', 'http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
  origin: allowed,
  credentials: true
}));

// ✅ Rate limiting
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use('/api/', apiLimiter);
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many OTP requests, try later.' }
});
app.use('/api/auth', otpLimiter);

// ✅ Protect admin dashboard
app.get("/admin", adminOnly, (req, res) => {
  res.sendFile(path.join(__dirname, "Admin/admin.html"));
});
app.use("/admin", adminOnly, express.static(path.join(__dirname, "Admin/")));

// ✅ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirnamePath, 'uploads')));

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postRoutes);

// ✅ FIXED PROFILE ROUTE PATH
app.use('/api/user/profile', profileRoutes);

app.use('/api/admin/products', productRoutes);
app.use("/api", contactRoute);
app.use('/api', userProfile);

// ✅ Connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/jewelry');

app.get('/product', async (req, res) => {
  try {
    await product.listProducts(req, res);
  } catch (err) {
    console.error('Error listing products:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ✅ Serve the profile page
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// ✅ Catch-all route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirnamePath, 'public', 'index.html'));
});

app.listen(PORT || 5000, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}...`);
});
