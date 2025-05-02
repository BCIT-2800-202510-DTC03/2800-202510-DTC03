const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types
            .ObjectId /* type value is of type ObjectId */,
        default: () =>
            new mongoose.Types.ObjectId() /* Automatically set default to a new ObjectId if not provided */,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        minimumLength: 10,
        required: true,
    },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
