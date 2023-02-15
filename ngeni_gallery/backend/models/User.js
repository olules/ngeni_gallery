const mongoose = require("mongoose");
const passportmongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.plugin(passportmongoose, {
  usernameField: "email",
});

//Associating the schema with actual collection name
module.exports = mongoose.model("Users", UserSchema);
