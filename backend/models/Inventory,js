const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    userId: String,
    displayName: String,
    typeName: String,
    position: {
        type: String,
        enum: ["fence", "building", "shelf", "object", "plant"]
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
