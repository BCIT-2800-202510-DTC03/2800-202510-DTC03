const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserTaskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
