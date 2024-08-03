const express = require('express');
const router = express.Router();
const { handleGetClicks } = require('../controllers/analytics');

router.get("/:shortID",handleGetClicks);

module.exports = router;