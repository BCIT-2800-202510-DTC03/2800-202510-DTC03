const mongoose = require("mongoose");
const { type } = require("os");

const preMadeTaskSchema = new mongoose.Schema({
    category: String,
    description: String,
});

const PreMadeTask = mongoose.model("PreMadeTask", preMadeTaskSchema);

module.exports = PreMadeTask;
