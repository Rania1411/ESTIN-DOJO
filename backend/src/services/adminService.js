const User = require('../models/User');
const Module = require('../models/Module');
const Message = require('../models/Message');

const getAllUsers = async () => {
  return await User.find({}).select('-password');
};

const deleteUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.deleteOne();
  return { id };
};

const updateUserRoleById = async (id, role) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  user.role = role || user.role;
  const updatedUser = await user.save();
  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  };
};

const createNewModule = async (moduleData, userId) => {
  const { name, year, description } = moduleData;
  const newModule = new Module({
    name,
    year,
    description,
    createdBy: userId,
  });
  return await newModule.save();
};

const deleteMessageById = async (id) => {
  const message = await Message.findById(id);
  if (!message) {
    throw new Error('Message not found');
  }
  await message.deleteOne();
  return { id, message: 'Message deleted' };
};

module.exports = {
  getAllUsers,
  deleteUserById,
  updateUserRoleById,
  createNewModule,
  deleteMessageById,
};
