const express = require("express");
const router = express.Router();

// import DB models
const User = require("./models/User");
const Garden = require("./models/Garden");
const Decoration = require("./models/Decoration");

router.get("/getGarden", async (req, res) => {
    console.log("CHECK FOR SESSIONS");
    console.log(req.session);
    console.log(req.session.user);
    console.log(req.session.userId);
    const response = await Garden.findOne({userID: req.session.user._id});
    
    if (response) {
        console.log("SUCCESS")
        const garden = response.garden;

        res.json(garden);
    } else {
        console.log("FAIL")
        res.status(400).send(req.session.userId);
    }
})

router.get("/getShopItem/:tab", async (req, res) => {
    console.log("TAB NAME: " + req.params.tab);
    const response = await Decoration.find({position: req.params.tab});
    
    if (response) {
        console.log("SUCCESS")
        res.json(response);
    } else {
        console.log("FAIL")
        res.status(400).send(req.params.tab);
    }
})

router.get("/getWallet", async (req, res) => {
    console.log("Getting Wallet for: " + req.session.user._id)

    const user = await User.findOne({userID: req.session.user._id});
    console.log("USER \n" + user);
    
    req.session.user = user;
    
    if (user) {
        console.log("Wallet: SUCCESS")
        res.json(user);
    }   else {
        console.log("Wallet: FAIL")
        res.status(400);
    }
})


module.exports = router;
