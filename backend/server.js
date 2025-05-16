// Dotenv Needs to be 1 directory up from where server.js is
require("dotenv").config({
    path: "../.env",
});

// Modules and libraries
const connectToMongo = require("./db"); /* Reference db.js */
const express = require("express");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

/* First, setup HTTP server to setup notifications. Using Socket.io instead of Express. */
const http = require("http");
const { Server } = require("socket.io");

// Start express and server
const app = express();
const server = http.createServer(app); /* Create HTTP server */
const socketIo = new Server(server);

// Connect to database
connectToMongo();

// Setup middleware
app.use(
    cors({
        origin: [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "https://two800bloomgreener.onrender.com",
        ],
        credentials: true,
    })
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

// Static files (if any)

// Routes
const userRouter = require("./user");
app.use("/user", userRouter);

/* Settings Route */
const settingsRouter = require("./routes/settings");
app.use("/settings", settingsRouter);

/* Import service */
const { findTasksToNotify } = require("./services/taskService");

/* Redirect to Login */
app.get("/", (req, res) => res.redirect("/login"));

// Task routes
const Task = require("./models/Task");
/* Fetch tasks to notify */
app.get("/tasks/to-notify", async (req, res) => {
    try {
        const tasks = await findTasksToNotify();
        res.json(tasks);
    } catch (error) {
        console.error("Failed to fetch tasks to notify", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/* Route for showing user which task notifications they will see */
app.get("/notify-tasks/", async (req, res) => {
    try {
        const notifyTasks = await Task.find({
            username: req.session.user.username,
            notified: true,
        }).sort({ notifyAt: -1 }); // sort tasks by the tasks that need to be notified the soonest
        res.json(notifyTasks);
    } catch (error) {
        console.error("Error fetching task notifications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Setup scheduler
/* Start notification scheduler to run in the background */
require("./jobs/notifyTaskJob.js");

// Setup server
/* Socket.IO connection */
socketIo.on("connection", (socket) => {
    console.log("A user connected");
});

// Start server
// (Note: please do not replace with app.listen because this will be used instead of express starting the server for us. This allows constant two way communication to let notifications work)
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
