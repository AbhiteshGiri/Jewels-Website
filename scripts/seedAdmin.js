const dotenv=require("dotenv")
dotenv.config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin.model');
const bcrypt = require('bcrypt');

async function seed() {
  await connectDB("mongodb+srv://abhitesh:Abhitesh@cluster0.oja8fmy.mongodb.net/jewelry");
  const email = process.env.ADMIN_EMAIL || "anujbca2022@gmail.com";
  const pass = process.env.ADMIN_PASS || "123456";
  if (!email || !pass) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASS in .env');
    process.exit(1);
  }
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash(pass, 10);
  await Admin.create({ email, password: hashed, name: 'Administrator' });
  console.log('Admin created:', email);
  process.exit(0);
}
seed();
