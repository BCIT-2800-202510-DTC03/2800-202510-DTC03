const mongoose = require("mongoose");
const Decoration = require("./Decoration");

const inventorySchema = new mongoose.Schema({
    userId: String,
    inventory: {
        fence: [Decoration],
        building: [Decoration],
        shelf: [Decoration],
        object: [Decoration],
        plant: [Decoration]
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
