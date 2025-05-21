const mongoose = require("mongoose");
const Decoration = require("./Decoration");

const inventorySchema = new mongoose.Schema({
    userId: String,
    inventory: {
        fence: {
            type: [Decoration],
            default: []
        },
        building: {
            type: [Decoration],
            default: []
        },
        shelf: {
            type: [Decoration],
            default: []
        },
        object: {
            type: [Decoration],
            default: []
        },
        plant: {
            type: [Decoration],
            default: []
        }
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
