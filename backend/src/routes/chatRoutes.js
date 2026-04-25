const express = require('express');
const router = express.Router();
const { getMessages, saveMessage } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/').get(getMessages).post(saveMessage);

module.exports = router;
