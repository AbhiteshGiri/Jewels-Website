const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller');
const { authenticate, adminOnly } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const postsUploadPath = path.join(__dirname, '..', 'uploads', 'posts');
if (!fs.existsSync(postsUploadPath)) {
  fs.mkdirSync(postsUploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, postsUploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_')),
});

const upload = multer({ storage });

router.use(authenticate, adminOnly);

// ✅ Accept only one image field called "image"
router.post('/posts', upload.single('image'), admin.createPost);
router.put('/posts/:id', upload.single('image'), admin.updatePost);
router.delete('/posts/:id', admin.deletePost);
router.get("/users",admin.getAllusers)
router.delete("/users/:id",admin.deleteUsers)

module.exports = router;
