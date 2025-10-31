const User = require('../models/User.model');
const logger = require('../utils/logger');
const path = require('path');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-password -resetToken -resetTokenExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Build full image URL (handle Google, uploaded, or default)
    let imageUrl;
    if (user.image && user.image.startsWith('http')) {
      // Google image
      imageUrl = user.image;
    } else if (user.image) {
      // Uploaded image (local)
      imageUrl = `${req.protocol}://${req.get('host')}${user.image}`;
    } else {
      // Default fallback
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/profile/default.jpg`;
    }

    res.json({
      user: {
        ...user.toObject(),
        image: imageUrl
      }
    });
  } catch (err) {
    logger.error('getProfile error', { error: err });
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    // ✅ Handle uploaded image
    if (req.file) {
      updates.image = `/uploads/profile/${req.file.filename}`;
    }

    delete updates.password; // never allow password change here

    const user = await User.findByIdAndUpdate(req.user.sub, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Resolve image URL (Google or local)
    let imageUrl;
    if (user.image && user.image.startsWith('http')) {
      imageUrl = user.image;
    } else if (user.image) {
      imageUrl = `${req.protocol}://${req.get('host')}${user.image}`;
    } else {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/profile/default.jpg`;
    }

    res.json({
      message: 'Profile updated',
      user: {
        ...user.toObject(),
        image: imageUrl
      }
    });
  } catch (err) {
    logger.error('updateProfile error', { error: err });
    res.status(500).json({ message: 'Server error' });
  }
};
