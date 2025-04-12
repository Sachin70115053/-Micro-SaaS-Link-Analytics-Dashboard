// server/routes/links.js
const express = require('express');
const { 
  createLink, 
  redirectLink, 
  getLinks, 
  getLinkAnalytics 
} = require('../controllers/links');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createLink);
router.get('/', protect, getLinks);
router.get('/:id/analytics', protect, getLinkAnalytics);
router.get('/:shortCode', redirectLink);

module.exports = router;