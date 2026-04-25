const adminService = require('../services/adminService');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const result = await adminService.deleteUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'User not found') res.status(404);
    next(error);
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res, next) => {
  try {
    const result = await adminService.updateUserRoleById(req.params.id, req.body.role);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'User not found') res.status(404);
    next(error);
  }
};

// @desc    Create a module
// @route   POST /api/admin/modules
// @access  Private/Admin
const createModule = async (req, res, next) => {
  try {
    const createdModule = await adminService.createNewModule(req.body, req.user._id);
    res.status(201).json(createdModule);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/admin/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res, next) => {
  try {
    const result = await adminService.deleteMessageById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Message not found') res.status(404);
    next(error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUserRole,
  createModule,
  deleteMessage,
};
