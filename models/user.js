const mongoose = require("mongoose");

// creating userschema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// validate the password with passed on user password
userSchema.methods.isValidatePassword = async function (userSentPassword) {
  return this.password === userSentPassword;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
