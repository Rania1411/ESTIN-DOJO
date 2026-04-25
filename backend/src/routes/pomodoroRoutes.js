const express = require('express');
const router = express.Router();
const {
  startSession,
  completeSession,
  getStats,
} = require('../controllers/pomodoroController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/start', startSession);
router.put('/complete/:id', completeSession);
router.get('/stats', getStats);

module.exports = router;
