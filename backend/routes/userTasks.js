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

router.post("/add", async (req, res) => {
    const userId = req.session.userId;
    const { description, category, isAIGenerated } = req.body;

    if (!userId) {
        return res.status(401).json({ error: "User is not authenticated" });
    }

    try {
        const newTask = new UserTasks({
            userId,
            description,
            category,
            isAIGenerated: isAIGenerated ? isAIGenerated : false,
            worth: 5,
            completed: false,
        });
        await newTask.save();
        res.status(201).json({
            message: "Successfully added task:",
            task: newTask,
        });
    } catch (error) {
        console.error("Couldn't save user task.", error);
        res.status(500).json({ error: "Couldn't add user task." });
    }
});

router.post('/complete', async (req, res) => {
    try {
        const { taskId } = req.body;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const updatedTask = await UserTasks.findByIdAndUpdate(
            taskId,
            { completed: true },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error('Failed to complete task:', err);
        res.status(500).json({ message: 'Failed to complete task' });
    }
});

module.exports = router;
