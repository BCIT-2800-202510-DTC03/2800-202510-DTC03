const express = require("express");
const router = express.Router();


const weatherAPIkey = process.env.WEATHER_API;
router.get("/weatherAPI", async (req, res) =>{
    // console.log("Getting weatherAPI");
    res.status(200).json({apiKey: weatherAPIkey});
})

const AIAPIkey = process.env.AI_API;
router.get("/AIAPI", async (req, res) => {
    console.log("Getting AI API");
    res.status(200).json({apiKey: AIAPIkey});
})


module.exports = router;