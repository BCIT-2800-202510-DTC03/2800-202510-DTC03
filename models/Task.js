const mongoose = require("mongoose");
/* See: https://mongoosejs.com/docs/schematypes.html for more info */

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
