const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(body === undefined){
        return res.status(400).json({
            message: "body is required"
        })
    }
    if(body.redirectURL === undefined || body.redirectURL === ""){
        return res.status(400).json({
            message: "redirectURL is required"
        })
    }
    const shortID = shortid();
    await URL.create({
        shortURL: shortID,
        redirectURL: body.redirectURL,
        visitHistory: [],
    });

    return res.json({
        id: shortID,
        message: "Created"
    })
}

async function handleDeleteURL(req,res){
    //not allowed to delete
    return res.status(403).json({
        message: "Not allowed to delete"
    })
}

module.exports = {
    handleGenerateNewShortURL,handleDeleteURL
}