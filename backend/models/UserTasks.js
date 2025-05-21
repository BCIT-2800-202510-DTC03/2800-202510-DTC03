
const mongoose = require("mongoose");

const UserTaskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    isAIGenerated: {
        type: Boolean,
        default: false,
        required: true,
    },
    taskId: {
        type: String,
        default: ""
    },
    // taskId is empty for AI generated task

    description: {
        type: String,
        default: ""
    },
    // description is empty for preMade task

    category: {
        type: String
    },
    worth: {
        type: Number,
        integer: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
})

const UserTasks = mongoose.model("UserTasks", UserTaskSchema);

module.exports = UserTasks;