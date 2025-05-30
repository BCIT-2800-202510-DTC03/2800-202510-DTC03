const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
    userId: String,
    fence: {
        type: String,
        default: "",
    },
    building: {
        type: String,
        default: "",
    },
    shelf: {
        type: String,
        default: "",
    },
    rightObject: {
        type: String,
        default: "",
    },
    leftObject: {
        type: String,
        default: "",
    },
    plant1: {
        type: String,
        default: "",
    },
    plant2: {
        type: String,
        default: "",
    },
    plant3: {
        type: String,
        default: "",
    },
    plant4: {
        type: String,
        default: "",
    },
    plant5: {
        type: String,
        default: "",
    },
    plant6: {
        type: String,
        default: "",
    }
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = Garden;
