const URL = require('../models/url');

async function handleGetClicks(req,res){
    const shortID = req.params.shortID;
    if(!shortID){
        return res.status(400).json({
            message: "Invalid short URL"
        })
    }
    const entry = await URL.findOne({
        shortURL:shortID
    })
    if(entry){
        return res.status(200).json({
            message: "Success",
            clicks: entry.visitedHistory.length
        })
    }
    else{
        return res.status(404).json({
            message: "URL not found"
        })
    }
}

module.exports = {handleGetClicks};