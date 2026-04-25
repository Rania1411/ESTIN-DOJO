const chatService = require('../services/chatService');

// @desc    Get recent chat messages
// @route   GET /api/chat
// @access  Private
const getMessages = async (req, res, next) => {
  try {
    const messages = await chatService.fetchRecentMessages();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Save a new chat message
// @route   POST /api/chat
// @access  Private
const saveMessage = async (req, res, next) => {
  try {
    const populatedMessage = await chatService.createNewMessage(req.user.id, req.body.content);

    // Emit the message via socket if accessible
    const io = req.app.get('io');
    if (io) {
      io.to('global-chat').emit('newMessage', populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    if (error.message === 'Please add content') res.status(400);
    next(error);
  }
};

module.exports = {
  getMessages,
  saveMessage,
};
