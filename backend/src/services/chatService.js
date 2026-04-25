const Message = require('../models/Message');

const fetchRecentMessages = async () => {
  const messages = await Message.find({})
    .populate('sender', 'name role')
    .sort({ createdAt: -1 })
    .limit(50);
  
  return messages.reverse();
};

const createNewMessage = async (userId, content) => {
  if (!content) {
    throw new Error('Please add content');
  }

  const message = await Message.create({
    sender: userId,
    content,
  });

  return await message.populate('sender', 'name role');
};

module.exports = {
  fetchRecentMessages,
  createNewMessage,
};
