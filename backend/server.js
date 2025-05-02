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



const usersArr = [
  { email: 'admin1@test.com', password: 'admin1' },
  { email: 'admin2@test.com', password: 'admin2' },
  { email: 'user1@test.com', password: 'password1' },
  { email: 'user2@test.com', password: 'password2' },
  { email: 'user3@test.com', password: 'password3' }
];

app.post('/user/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersArr.find(user => user.email === email && user.password === password);

  if (user) {
    res.send({
      message: `Welcome ${email}`,
    });
  } else {
    res.status(401).json({error_message: "Invalid credentials"});
  }
 })

app.post('/user/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error_message: "email and password are required"
    });
  }

  const userExists = usersArr.some(user => user.email === email);
  if (userExists) {
    return res.status(409).json({
      error_message: "email already exists"
    });
  }

  const newUser = {
    email,
    password
  };
  usersArr.push(newUser);

  res.status(200).json({
    message: "Registration successful",
    email: newUser.email
  });
});


 app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })