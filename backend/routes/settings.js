const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

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
