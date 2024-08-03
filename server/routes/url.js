const express = require('express');
const { handleGenerateNewShortURL,handleDeleteURL } = require('../controllers/url');
const router = express.Router();

router.post("/",handleGenerateNewShortURL);
router.delete("/",handleDeleteURL)

module.exports = router;