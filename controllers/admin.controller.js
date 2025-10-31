const Post = require('../models/Post.model');
const logger = require('../utils/logger');
const User= require("../models/User.model")

exports.createPost = async (req, res) => {
  try {
    const { title, description,category} = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title required' });
    }

    const image = req.file ? `/uploads/posts/${req.file.filename}` : null;
    console.log(image)
    const post = await Post.create({
      title,
      description,
      category,
      image,
      date:Date.now(),
      createdBy: 'admin'
    });

    res.json({ message: 'Post created successfully', post });
  } catch (err) {
    logger.error('createPost error', { error: err });
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.files && req.files.length) {
      updates.images = (req.files || []).map(f => `/uploads/posts/${f.filename}`);
    }
    const post = await Post.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Updated', post });
  } catch (err) { logger.error('updatePost error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) { logger.error('deletePost error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};

exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) { logger.error('listPosts error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};
exports.viewPosts= async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ success: true, views: post.views });
  } catch (err) {
    console.error('updateViews error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAllusers = async (req, res) => {
  try {
    const Users = await User.find()
    res.json({ Users });
  } catch (err) { logger.error('listPosts error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};
exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) { logger.error('deletePost error', { error: err }); res.status(500).json({ message: 'Server error' }); }
};