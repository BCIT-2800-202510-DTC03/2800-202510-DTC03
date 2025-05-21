const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    userId: String,
    fence: {
        type: [Map],
        default: []
    },
    building: {
        type: [Map],
        default: []
    },
    shelf: {
        type: [Map],
        default: []
    },
    object: {
        type: [Map],
        default: []
    },
    plant: {
        type: [Map],
        default: []
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
