const express = require("express");
const router = express.Router();
const UserTasks = require("../models/UserTasks");

router.get("/", async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res
                .status(401)
                .json({ error: "User is not authenticated." });
        }

        const tasksList = await UserTasks.find({ userId });
        res.status(200).json(tasksList);
    } catch (error) {
        console.error("Failed to fetch user's task list:", error);
        res.status(500).json({
            error: "Server error while fetching user's task list.",
        });
    }
});

module.exports = router;
