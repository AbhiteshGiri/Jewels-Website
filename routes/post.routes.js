const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const admin= require('../controllers/admin.controller')


router.put('/views/:id',admin.viewPosts);
router.get('/', admin.listPosts);

module.exports = router;
