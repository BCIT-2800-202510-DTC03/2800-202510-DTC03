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
    description: {
        type: String,
        default: "",
    },
    // description is empty for preMade task

    category: {
        type: String,
    },
    worth: {
        type: Number,
        integer: true,
    },
    completed: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const UserTasks = mongoose.model("UserTasks", UserTaskSchema);

module.exports = UserTasks;
