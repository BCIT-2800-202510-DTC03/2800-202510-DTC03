require("dotenv").config({
    path: "../.env",
}); /* Needs to be 1 directory up from where server.js is */
const connectToMongo = require("./db"); /* Reference db.js */

const express = require("express");
const session = require("express-session");
const path = require("path"); /* Needed for working with directories and file paths */
// const path = require("path"); /* Needed for working with directories and file paths */

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

/* Middleware to parse JSON and form data */
app.use(
    cors({
        origin: ["http://localhost:5500", "http://127.0.0.1:5500", "https://two800bloomgreener.onrender.com"],
        credentials: true
    }
    )
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET /* from .env */,
        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
        },
        // for deploy in future
        //     cookie: {
        //   httpOnly: true,
        //   secure: true,
        // }
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

/* Settings Route */
const settingsRouter = require("./routes/settings");
app.use("/settings", settingsRouter);
