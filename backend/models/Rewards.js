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
});

const Reward = mongoose.model("Reward", rewardSchema);
module.exports = Reward;
