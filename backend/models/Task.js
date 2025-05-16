const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    notifyAt: Date,
    notified: Boolean,
});
// Indexing helps us query the db faster when looking through all tasks for notification status
taskSchema.index({ notifyAt: 1, notified: 1 });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
