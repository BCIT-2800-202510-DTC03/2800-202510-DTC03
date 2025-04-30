const express = require("express");
const app = express();

const mongoose = require("mongoose");

main().catch((err) => console.log(err));
/* Cors is used for preventing web pages from making requests to a different domain than the one that served the web page unless specified
 */
const cors = require("cors");
app.use(cors());

async function main() {
    await mongoose
        .connect
        // Local host
        // "mongodb://127.0.0.1:27017/test"

        // Mongo DB Atlas
        // mongoose.connect("mongodb+srv://mongo:mongo@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        ();
}
