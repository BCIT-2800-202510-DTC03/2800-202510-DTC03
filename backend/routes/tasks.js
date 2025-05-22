const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const UserTasks = require("../models/UserTasks");
const User = require("../models/User");

// Gets all the tasks grouped by category
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        const grouped = {};

        tasks.forEach((task) => {
            if (!grouped[task.category]) {
                grouped[task.category] = [];
            }
            grouped[task.category].push({
                text: task.description,
                sunPoints: task.worth,
            });
        });

        res.json(grouped);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST route to create a new task, not AI generated one
router.post("/", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: "User not logged in" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const {
            isAIGenerated,
            taskId,
            taskDescription,
            taskCategory,
            worth,
            completed,
        } = req.body;
        const newTask = new UserTasks({
            userId: userId,
            isAIGenerated: false,
            taskId: taskId, // should be pass from the front end
            description: taskDescription, // waiting to be passed from frontend
            category: taskCategory, // waiting to be passed from frontend
            worth: 5,
            completed: false,
        });
        await newTask.save();
        res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    } catch (err) {
        console.error("post ai task error:", err);
        res.status(500).json({ err: "Server error" });
    }
});

// POST route to update an existing task
router.post("/update/:userTasksId", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: "User not logged in" });
        }

        const userTasksId = req.params.userTasksId;
        const { description, category, worth, completed } = req.body;

        const userTask = await UserTasks.findOne({
            _id: userTasksId,
            userId: userId,
        });
        if (!userTask) {
            return res
                .status(404)
                .json({ error: "Task not found or access denied" });
        }
        userTask.completed = completed; // completed is a boolean, true for completed
        await userTask.save();
        res.status(200).json({
            message: "Task updated successfully",
            userTask,
        });
    } catch (err) {
        console.error("Error updating task:", err);
    }
});
// POST route to delete a task
router.post("/delete/:userTasksId", async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: "User not logged in" });
        }

        const userTasksId = req.params.userTasksId;

        const deletedTask = await UserTasks.findOneAndDelete({
            _id: userTasksId,
            userId: userId,
        });
        if (!deletedTask) {
            return res
                .status(404)
                .json({ error: "Task not found or access denied" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err);
    }
});

module.exports = router;
