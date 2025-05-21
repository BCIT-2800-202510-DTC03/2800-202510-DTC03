const express = require("express");
const router = express.Router();

// import user model
const User = require("../models/User");
const Garden = require("../models/Garden");
const Inventory = require("../models/Inventory");

// hashing function from nodejs
// https://nodejs.org/api/crypto.html#class-hash
const { createHash } = require("node:crypto");

//hashing function
function hashing(input) {
    return createHash("sha256").update(input).digest("hex");
}

// Check if user is logged in
router.get("/status", (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });

        // find the user
        if (!user) {
            return res.status(401).json({
                error_message: "Email or password is incorrect",
            });
        }

        // validate the password
        const hashedInputPassword = hashing(password);
        if (user.password !== hashedInputPassword) {
            return res.status(401).json({
                error_message: "Email or password is incorrect",
            });
        }

        // if success
        // update session
        if (user) {
            req.session.user = user;
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
            req.session.userId = user._id.toString();
        }

        res.status(200).json({
            message: `Welcome ${user.username}`,
            email: user.email,
        });
        console.log("Login successfully", req.session.userId);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error_message: "Server error",
        });
    }
});

// logout
router.post("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Logout failed");
        }
        res.clearCookie("connect.sid");
        console.log("You hit the logout.");
        res.sendStatus(200);
    });
});

// register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate input are not empty
        if (!email || !password) {
            return res.status(400).json({
                error_message: "Email and password are required",
            });
        }

        // check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                error_message: "Email already exists",
            });
        }

        const newUser = new User({
            username: email,
            email: email,
            password: hashing(password),
        });
        //
        await newUser.save();
        console.log("save user");

        // New Garden
        const newGarden = new Garden({
            userId: newUser._id,
        });
        await newGarden.save();
        console.log("save garden");

        // New Inventory
        const newInventory = new Inventory({
            userId: newUser._id,
        });
        await newInventory.save();
        console.log("save inventory");

        // if success
        // update session
        if (newUser) {
            req.session.user = newUser;
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
            req.session.userId = newUser._id.toString();
        }

        req.session.touch();

        res.status(200).json({
            message: `Welcome ${newUser.username}`,
            email: newUser.email,
        });
        console.log("Registration response sent", req.session.userId);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            error_message: "Server error",
        });
    }
});
// route for testing
router.get("/test", (req, res) => {
    if (req.session.userId) {
        return res.status(200).json({ session: req.session });
    }
    res.send("Router working");
});

router.get("/UserInfo", async (req, res) => {
    try {
        const id = req.session.userId;

        if (!id) {
            return res.status(401).json({
                error_message: "User ID not available.",
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                error_message: "Failed to find user.",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Failed to fetch user information: ", error);
        res.status(500).json({
            error_message: "Server error",
        });
    }
});

router.post("/updateInfo", async (req, res) => {
    try {
        const { aboutMe, pfp, goal } = req.body;
        const id = req.session.userId;

        if (!id) {
            return res.status(401).json({
                error_message: "No active user session.",
            });
        }

        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(401).json({
                error_message: "Failed to find user.",
            });
        }

        //update user information
        user.aboutMe = aboutMe;
        user.profilePicture = pfp;
        user.goal = goal;
        console.log("assigned");
        //save changes
        await user.save();

        res.status(200).json({ message: "Successfully updated user." });
    } catch (error) {
        console.error("Failed to update user information: ", error);
        res.status(500).json({
            error_message: "Server error",
        });
    }
});

module.exports = router;
