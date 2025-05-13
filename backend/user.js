const express = require("express");
const router = express.Router();

// import user model
const User = require("./models/User");

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

        // if success
        // update session
        if (newUser) {
            req.session.user = newUser;
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
            req.session.userId = newUser._id.toString();
        }

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
    res.send("Router working");
});

module.exports = router;
