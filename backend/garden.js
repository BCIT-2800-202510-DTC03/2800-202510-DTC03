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

router.post("/buyShopItem/:position/:type", async (req, res) => {
    const user = await User.findOne({_id: req.session.user._id});
    const item = await Decoration.findOne({position: req.params.tab, typeName: req.params.type});

    if (user && item) {
        let totalCurrency = user.currency - item.cost;
    
        await User.updateOne(
            {_id: user._id}, 
            {$set: 
                {
                    currency: totalCurrency
                }
            }
        )

        const inInventory = await Inventory.findOne({userId: user._id.toString(), position: item.position, typeName: item.typeName})

        if (inInventory) {
            currentQuantity = inInventory.quantity + 1;

            await User.updateOne(
                {
                    userId: user._id.toString(),
                    position: item.position,
                    typeName: item.typeName
                }, 
                {$set: 
                    {
                        quantity: currentQuantity
                    }
                }
            )
            res.status(200);
        } else if (inInventory == null) {
            const newInventory = await new Inventory({
                userId: user._id.toString(),
                displayName: item.displayName,
                typeName: item.typeName,
                position: item.position
            });

            await newInventory.save();
            res.status(200);
        }
        
        res.status(400);
    }

    
})

module.exports = router;
