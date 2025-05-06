const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const mongoose = require("mongoose");

// main().catch((err) => console.log(err));
/* Cors is used for preventing web pages from making requests to a different domain than the one that served the web page unless specified
 */


// async function main() {
//     await mongoose
//         .connect
//         // Local host
//         // "mongodb://127.0.0.1:27017/test"

//         // Mongo DB Atlas
//         // mongoose.connect("mongodb+srv://mongo:mongo@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
//         ();
// }


// https://expressjs.com/en/guide/routing.html
const userRouter = require('./user')
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})