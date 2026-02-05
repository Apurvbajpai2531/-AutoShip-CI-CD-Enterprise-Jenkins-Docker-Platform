const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

router.get('/orders', (req, res) => {
  res.json({ orders: [] });
});

module.exports = router;
