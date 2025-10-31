const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');
const { authenticate, adminOnly } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productUploadPath = path.join(__dirname, '..', 'uploads', 'products');
if (!fs.existsSync(productUploadPath)) fs.mkdirSync(productUploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, productUploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`),
});

const upload = multer({ storage });

router.use(authenticate, adminOnly);

router.post('/', upload.single('image'), async (req, res) => {
  try {
    await product.createProduct(req, res);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    await product.listProducts(req, res);
  } catch (err) {
    console.error('Error listing products:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    await product.updateProduct(req, res);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await product.deleteProduct(req, res);
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
