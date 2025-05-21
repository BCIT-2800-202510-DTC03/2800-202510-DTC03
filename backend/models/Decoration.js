const mongoose = require("mongoose");

const decorationSchema = new mongoose.Schema({
    displayName: String,
    typeName: String,
    position: {
        type: String,
        enum: ["fence", "building", "shelf", "object", "plant"]
    },
    cost: Number
});

const Decoration = mongoose.model("Decoration", decorationSchema);

module.exports = Decoration;
