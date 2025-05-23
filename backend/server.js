require("dotenv").config({
    path: "../.env",
}); /* Needs to be 1 directory up from where server.js is */
const connectToMongo = require("./db"); /* Reference db.js */

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Add conditional statement for switching between production and development easily. Just update .env from NODE_ENV=production to NODE_ENV=development.
const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? ["https://two800bloomgreener.onrender.com"]
        : [
              "http://localhost:5500",
              "http://127.0.0.1:5500",
              "https://two800bloomgreener.onrender.com",
          ];

/* Middleware to parse JSON and form data */
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET /* from .env */,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24, // 1天
        },
    })
);

connectToMongo();

const userRouter = require("./routes/user");
app.use("/user", userRouter);

/* Login */
app.get("/", (req, res) => res.redirect("/login"));

const gardenRouter = require("./routes/garden");
app.use("/garden", gardenRouter);

const apiRouter = require("./API");
app.use("/API", apiRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

/* Settings Route */
const settingsRouter = require("./routes/settings");
app.use("/settings", settingsRouter);

/* Tasks Route */
const taskRouter = require("./routes/tasks");
app.use("/task", taskRouter);

const userTasksRouter = require("./routes/userTasks");
app.use("/userTasks", userTasksRouter);

/*Ai tasks Route*/
const aiTaskRouter = require("./routes/aiTask");
app.use("/task/ai", aiTaskRouter);
