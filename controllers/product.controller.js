const Product = require('../models/Product.model');
const path = require('path');
const logger = require('../utils/logger');

exports.createProduct = async (req, res) => {
  try {
    console.log(" inside create product")
    const { name, category, price, description,material,badge,gender } = req.body;
    if (!name) return res.status(400).json({ message: 'Product name required' });

    const image = req.file ? `/uploads/products/${req.file.filename}` : '';
    const product = await Product.create({ name, category, price, description, image,material,badge,gender });
    res.json({ message: 'Product added', product });
  } catch (err) {
    logger.error('createProduct error', { error: err });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    logger.error('listProducts error', { error: err });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) updates.image = `/uploads/products/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Product updated', product });
  } catch (err) {
    logger.error('updateProduct error', { error: err });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    logger.error('deleteProduct error', { error: err });
    res.status(500).json({ message: 'Server error' });
  }
};
