const express = require('express');
const router = express.Router();
const {
    generateEmail,
    getHistory,
    deleteHistory,
} = require("../controllers/aiController");
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-email', protect, generateEmail);
router.get('/history', protect, getHistory);
router.delete("/history/:id", protect, deleteHistory);

module.exports = router;