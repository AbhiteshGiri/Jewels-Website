const Post = require('../models/Post.model');
const logger = require('../utils/logger');

exports.getPublished = async (req, res) => {
  try {
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) { logger.error('getPublished error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};

exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, published: true });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json({ post });
  } catch (err) { logger.error('getBySlug error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};
