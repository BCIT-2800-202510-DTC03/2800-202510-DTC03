const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: String,
    rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reward" }],
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
