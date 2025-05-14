const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    notifyAt: Date,
    notified: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
