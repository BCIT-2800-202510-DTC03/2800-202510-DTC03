const express = require("express");
const router = express.Router();

// import DB models
const Garden = require("./models/Garden");

router.get("/getGarden", async (req, res) => {
    const garden = await Garden.findOne({userID: req.session.userID});
    
    res.json(garden);
})