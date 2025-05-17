const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Gets all the tasks grouped by category
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        const grouped = {};

        tasks.forEach(task => {
            if (!grouped[task.category]) {
                grouped[task.category] = [];
            }
            grouped[task.category].push({
                text: task.description,
                sunPoints: task.worth
            });
        });

        res.json(grouped);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
