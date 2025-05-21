const express = require("express");
const router = express.Router();
const UserTasks = require("../models/UserTasks");

const userId = req.session.userId;
if (!userId) {
    return res.status(401).json({ error: "User not logged in" });
}
const user = await User.findById(userId);

router.post("/", async (req, res) => {
    try {
        const { userId, isAIGenerated, taskId, description, category, worth, completed } = req.body;
        const newAITask = new UserTasks({
            userId: userId,
            isAIGenerated: true,
            taskId: "",
            description: taskDescription,// waiting to be passed from frontend
            category: taskCategory,// waiting to be passed from frontend
            worth: 5,
            completed: false
        });
        await newAITask.save();
        console.log("Saved new AI tasks", newAITask)
    } catch (error) {
        console.error("post ai task error:", error);
    }
})