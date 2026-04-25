const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  updateUserRole,
  createModule,
  deleteMessage,
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// Protect all admin routes and require admin role
router.use(protect);
router.use(admin);

router.route('/users').get(getUsers);
router.route('/users/:id').delete(deleteUser);
router.route('/users/:id/role').put(updateUserRole);

router.route('/modules').post(createModule);
router.route('/messages/:id').delete(deleteMessage);

module.exports = router;
