const express = require("express");
const router = express.Router();

// hashing function from nodejs
// https://nodejs.org/api/crypto.html#class-hash
const { createHash } = require("node:crypto");

function hashing(input) {
  return createHash("sha256").update(input).digest("hex");
}

// mockdata, will be update after database connection done
let usersArr = [
  { email: "admin1@test.com", password: "admin1" },
  { email: "admin2@test.com", password: "admin2" },
  { email: "user1@test.com", password: "password1" },
  { email: "user2@test.com", password: "password2" },
  { email: "user3@test.com", password: "password3" },
];

usersArr = usersArr.map((user) => ({
  email: user.email,
  password: hashing(user.password),
}));

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = usersArr.find(
    (user) => user.email === email && user.password === hashing(password)
  );

  if (user) {
    res.send({
      message: `Welcome ${email}`,
    });
  } else {
    res.status(401).json({ error_message: "Email or password is incorrect" });
  }
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error_message: "Email and password are required",
    });
  }

  const userExists = usersArr.some((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({
      error_message: "Email already exists",
    });
  }

  const newUser = {
    email: email,
    password: hashing(password),
  };
  usersArr.push(newUser);

  res.status(200).json({
    message: "Registration successful",
    email: newUser.email,
  });
});

module.exports = router;
