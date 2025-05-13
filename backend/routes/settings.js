const express = require("express");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

// This is helpful for being able to reuse the same routes later on in server.js. Works similarily to const app = express(), except you can import it as a module into other backend files to reuse the routes
const router = express.Router(); // See this for more info: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

const User = require("../models/User"); // Express server accesses Mongoose schema to structure the query to MongoDb

// Populate the settings page
router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error("Database error", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Updating account information
router.post("/update", async (req, res) => {
    const userId = req.session.userId;
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");

        user._id = userId;
        user.email = email;

        // Only change password if old, new , and confirm are filled
        if (oldPassword && newPassword && confirmPassword) {
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                return res
                    .status(400)
                    .json({ error: "Old password is incorrect" });
            }

            if (newPassword !== confirmPassword) {
                return res
                    .status(400)
                    .json({ error: "Passwords do not match" });
            }

            const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
            user.password = passwordHash;
        }

        await user.save();
        res.json({ message: "Settings updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating settings" });
    }
});

module.exports = router;
