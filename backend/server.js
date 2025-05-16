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

// Connect database
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

/* Routes (not including task routes, those come later after the server start (server.listen(...)) */
const userRouter = require("./user");
app.use("/user", userRouter);

/* Settings Route */
const settingsRouter = require("./routes/settings");
app.use("/settings", settingsRouter);

/* Redirect to Login */
app.get("/", (req, res) => res.redirect("/login"));

/* Start notification scheduler to run in the background */
require("./jobs/notifyTaskJob");

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Notification related items:

// First, setup HTTP server to setup notifications. Using Socket.io instead of Express.
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("A user connected");
});

// Start server
// (Note: please do not replace with app.listen because this will be used instead of express starting the server for us. This allows constant two way communication to let notifications work)
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Task routes
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
