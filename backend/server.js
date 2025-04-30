const express = require("express");
const app = express();

const mongoose = require("mongoose");

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
