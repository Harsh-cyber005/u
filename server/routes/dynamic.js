const express = require('express');
const router = express.Router();
const { handleGetURL } = require('../controllers/dynamic');

router.get("/:shortID",handleGetURL);

module.exports = router;