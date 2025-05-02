const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: String,
    rewards: [
        {
            reward: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reward",
                required: true,
            },
            quantity: {
                type: Number,
                default: 0,
                min: 0,
            },
        },
    ],
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
