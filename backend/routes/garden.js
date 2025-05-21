const express = require("express");
const router = express.Router();

// import DB models
const User = require("./models/User");
const Garden = require("./models/Garden");
const Decoration = require("./models/Decoration");
const Inventory = require("./models/Inventory");

router.get("/getGarden", async (req, res) => {
    console.log("CHECK FOR SESSIONS");
    console.log(req.session);
    console.log(req.session.user);
    console.log(req.session.userId);
    const response = await Garden.findOne({userId: req.session.userId});
    
    if (response) {
        console.log("SUCCESS")
        console.log(response.userId)
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
    console.log("Getting Wallet for: ")
    console.log(req.session.userId)

    const user = await User.findOne({_id: req.session.user._id});
    
    req.session.user.currency = user.currency;
    
    if (user) {
        console.log("Wallet: SUCCESS")
        res.json(user.currency);
    }   else {
        console.log("Wallet: FAIL")
        res.status(400).send("FAIL");
    }
})

router.get("/getInventory", async (req, res) => {
    console.log("Getting Inventory for: ")
    console.log(req.session.userId)

    const inventory = await Inventory.findOne({userId: req.session.user._id});
    
    console.log("FOUND INVENTORY")
    console.log(inventory)
    if (inventory) {
        console.log("Inventory: SUCCESS")
        res.json(inventory);
    }   else {
        console.log("Inventory: FAIL")
        res.status(400).send("FAIL");
    }
})

router.post("/buyShopItem/:position/:type", async (req, res) => {
    console.log("BUYING 1");
    
    const user = await User.findOne({_id: req.session.user._id});
    const item = await Decoration.findOne({position: req.params.position, typeName: req.params.type});
    const inventory = await Inventory.findOne({userId: req.session.userId});

    console.log("BUYING 2");
    console.log(user);
    console.log(item);
    console.log(inventory);

    if (user && item && inventory) {
        console.log("BUYING 2.5");
        let totalCurrency = user.currency - item.cost;
    
        await User.updateOne(
            {_id: user._id}, 
            {$set: 
                {
                    currency: totalCurrency
                }
            }
        )
        console.log("BUYING 3");

        switch (req.params.position) {
            case "fence": {
                await Inventory.updateOne(
                    {userId: req.session.userId},
                    { $push: { fence: item } }
                )
                break;
            }
            case "building": {
                await Inventory.updateOne(
                    {userId: req.session.userId},
                    { $push: { building: item } }
                )
                break;
            }
            case "shelf": {
                await Inventory.updateOne(
                    {userId: req.session.userId},
                    { $push: { shelf: item } }
                )
                break;
            }
            case "object": {
                await Inventory.updateOne(
                    {userId: req.session.userId},
                    { $push: { object: item } }
                )
                break;
            }
            case "plant":{
                await Inventory.updateOne(
                    {userId: req.session.userId},
                    { $push: { plant: item } }
                )
                break;
            }
        }

        console.log("BUYING 4");
        
        res.status(200).send("SUCCESS");
    } else {
        res.status(400).send("FAIL");
    }    
})

module.exports = router;
