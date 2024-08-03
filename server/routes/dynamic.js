const express = require('express');
const router = express.Router();
const { handleGetURL } = require('../controllers/dynamic');

router.get("/",(req,res) => {
    res.send("Hello World - Vercel Serverless");
})
router.get("/:shortID",handleGetURL);

module.exports = router;