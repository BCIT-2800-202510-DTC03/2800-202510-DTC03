const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

// This is helpful for being able to reuse the same routes later on in server.js. Works similarily to const app = express(), except you can import it as a module into other backend files to reuse the routes
const router = express.Router(); // See this for more info: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

const User = require("../models/User"); // Express server accesses Mongoose schema to structure the query to MongoDb

// Tell EJS to find views in root, not in backend
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// EJS Session store
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Populate the settings page
router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render("settings", { user });
    } catch (error) {
        console.error("Database error", error);
    }
});

// Updating account information
router.post("/update", async (req, res) => {
    const userId = req.session.userId;
    const { userName, email, oldPassword, newPassword, confirmPassword } =
        req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");

        user.username = userName;
        user.email = email;

        // Only change password if old and new are filled
        if (oldPassword && newPassword && confirmPassword) {
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                return res.render("settings", {
                    user,
                    error: "Old password is incorrect",
                });
            }

            if (newPassword !== confirmPassword) {
                return res.render("settings", {
                    user,
                    error: "Passwords do not match",
                });
            }

            const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
            user.password = passwordHash;
        }

        await user.save();
        res.redirect("/settings");
    } catch (error) {
        console.error(error);
        res.render("settings", {
            user: req.body,
            error: "Error updating settings",
        });
    }
});

module.exports = router;
