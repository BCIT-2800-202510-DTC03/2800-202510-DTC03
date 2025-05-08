const express = require("express");
const router = express.Router();

// import user model
const User = require("./models/User");

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

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    // find the user
    if (!user) {
      return res.status(401).json({
        error_message: "Email or password is incorrect",
      });
    }

    // validate the password
    const hashedInputPassword = hashing(password);
    if (user.password !== hashedInputPassword) {
      return res.status(401).json({
        error_message: "Email or password is incorrect",
      });
    }

    // login success
    res.json({
      message: `Welcome ${email}`,
      email: user.email,
    });

    // catch error
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error_message: "Server error",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validate input are not empty
    if (!email || !password) {
      return res.status(400).json({
        error_message: "Email and password are required",
      });
    }
    // check if user already exists
    const userExists = usersArr.some((user) => user.email === email);
    if (userExists) {
      return res.status(409).json({
        error_message: "Email already exists",
      });
    }

    const newUser = new User({
      username: email,
      email: email,
      password: hashing(password),
    });
    await newUser.save();

    // registration success
    res.status(200).json({
      message: "Registration successful",
      email: newUser.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error_message: "Server error",
    });
  }
});
// route for testing
router.get("/test", (req, res) => {
  res.send("Router working");
});

module.exports = router;
