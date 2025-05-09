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
  goal:{
      type: String,
      default: null,
    }
});
const User = mongoose.model("User", usersSchema);

module.exports = User;
