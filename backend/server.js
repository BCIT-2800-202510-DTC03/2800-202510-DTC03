const express = require("express");
const app = express();

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        minimumLength: 10,
        required: true,
    },
});
module.exports = User;

const User = mongoose.model("User", usersSchema);

const plantSchema = new mongoose.Schema({
    type: String,
    name: String,
    items: [String],
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;

main().catch((err) => console.log(err));
/* Cors is used for preventing web pages from making requests to a different domain than the one that served the web page unless specified
 */
const cors = require("cors");
app.use(cors());

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
