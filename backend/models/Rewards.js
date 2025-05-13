const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rarity: {
        type: String,
        required: true,
        enum: ["common", "uncommon", "rare", "epic"],
        lowercase: true, // Consistency for querying
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
});

const Reward = mongoose.model("Reward", rewardSchema);
module.exports = Reward;
