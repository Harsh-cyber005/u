const URL = require('../models/url');

async function handleGetURL(req,res){
    const shortID = req.params.shortID;
    if(!shortID){
        return res.status(400).json({
            message: "Invalid short URL"
        })
    }
    const entry = await URL.findOneAndUpdate({
        shortURL:shortID
    },{
        $push: {
            visitedHistory: {
                timestamp: Date.now(),
            }
        },
    },{new:true})
    if(entry){
        if (!entry.redirectURL.startsWith('http')) {
            entry.redirectURL = 'http://' + entry.redirectURL;
        }
        return res.redirect(entry.redirectURL);
    }
    else{
        return res.status(404).json({
            message: "URL not found"
        })
    }
}

module.exports = {handleGetURL};