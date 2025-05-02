const express = require("express");
const session = require("express-session");
require("dotenv").config();

const connectToMongo = require("./db"); /* Reference db.js */
const app = express();
const port = process.env.PORT || 3000;

/* Middleware to parse JSON and form data */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Session setup */
app.use(
    session({
        secret: process.env.SESSION_SECRET /* from .env */,
        resave: false,
        saveUninitialized: false,
    })
);

connectToMongo();

app.get("/", (req, res) => {
    res.send("Server connected to MongoDB");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
