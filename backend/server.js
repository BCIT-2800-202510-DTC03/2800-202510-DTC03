const express = require("express");
const session = require("express-session");
const cors = require("cors");
// const path = require("path"); /* Needed for working with directories and file paths */
require("dotenv").config();

const connectToMongo = require("./db"); /* Reference db.js */
const app = express();
const PORT = process.env.PORT || 3000;

/* Middleware to parse JSON and form data */
app.use(
    cors(
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://two800bloomgreener.onrender.com",
    )
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* For serving up static files if we need to host our own images depending on bandwith restrictions for mongodb/cloundinary. This means anything that needs to be accessed publicy will be in the public folder, not yet made. */
app.use(express.static("public"));

/* Session setup */
app.use(
    session({
        secret: process.env.SESSION_SECRET /* from .env */,
        resave: false,
        saveUninitialized: false,

        // for local test
        // cookie: {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "none",
        //     maxAge: 1000 * 60 * 60 * 24,
        // },

        // for deploy in future
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24,
        }
    })
);

connectToMongo();

/* Routes */
// app.use("/", authRoutes); /* These aren't made yet, so just placeholders */
// app.use("/tasks", taskRoutes);
// app.use("/rewards", rewardRoutes);

/* Testing purposes */
// app.get("/", (req, res) => {
//     res.send("Server connected to MongoDB");
// });

// https://expressjs.com/en/guide/routing.html
const userRouter = require("./user");
app.use("/user", userRouter);
/* Login */
app.get("/", (req, res) => res.redirect("/login"));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
