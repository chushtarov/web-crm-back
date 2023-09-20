const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: {
    type: String,
    minlength: 4,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
  isStudent: {
    type: Boolean,
    default: false,
  },
  result: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
