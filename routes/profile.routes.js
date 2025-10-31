const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile.controller');
const { authenticate } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

const profileUploadPath = path.join(__dirname, '..', 'uploads', 'profile');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profileUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g,'_'));
  }
});
const upload = multer({ storage });

router.get('/', authenticate, profile.getProfile);
router.put('/', authenticate, upload.single('image'), profile.updateProfile);

module.exports = router;
