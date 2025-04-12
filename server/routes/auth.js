
const express = require('express');
const { login, getMe,register } = require('../controllers/auth');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
// server/routes/auth.js
router.post('/register', register);

module.exports = router;