const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    category: String,
    description: String,
    worth: {
        type: Number,
        integer: true,
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
