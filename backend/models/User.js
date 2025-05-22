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
    minLength: 10,
    required: true,
  },
  currency: {
    type: Number,
    default: 0,
  },
  aboutMe: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  goal: {
    type: String,
    default: "greenerEating",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
const User = mongoose.model("User", usersSchema);

module.exports = User;
