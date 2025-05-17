// Node Cron is a task scheduler module for notification management. Went with this over setInterval() because node cron has easier to read time syntax.
// eg1: Minute / Hour / Day / Month / Day of Week (0-6, Sunday being 0)
// eg2: Mon-Fri at 6 PM is:	0 18 * * 1-5
const cron = require("node-cron");
const { findTasksToNotify } = require("../services/taskService");

// Scheduling one notification for every 10 minutes as a test
cron.schedule("*/10 * * * *", async () => {
    try {
        console.log("Cron is running!");
        const tasksToNotify = await findTasksToNotify();
        if (tasksToNotify.length > 0) {
            console.log("Tasks to notify:", tasksToNotify);
            for (const task of tasksToNotify) {
                console.log("Notification for:", task.name);

                // Mark task as notified
                task.notified = true;
                await task.save();
            }
        } else {
            console.log(
                "No tasks to notify. Please update your task reminders or add a new task."
            );
        }
    } catch (error) {
        console.error("Error getting notification:", error);
    }
});
