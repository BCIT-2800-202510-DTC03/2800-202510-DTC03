const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    type: String,
    name: String,
    items: [String],
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
