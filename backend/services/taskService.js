/* Task route for notifications */
const Task = require("../models/Task");

async function findTasksToNotify() {
    try {
        const tasks = await Task.find({
            notifyAt: { $lte: newDate() },
            notified: false,
        });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks to notify:", error);
        return []; // adding a fallback return value in case an error occurs so we don't get undefined
    }
}

async function markAsNotified(taskId) {
    await Task.findByIdAndUpdate(taskId, { notified: true });
}

module.exports = { findTasksToNotify, markAsNotified };
