const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  material:String,
  price: Number,
  rating:String,
  reviews:Number,
  description: String,
  gender:String,
  image: String,
  badge:String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
