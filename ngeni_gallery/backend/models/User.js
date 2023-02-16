import { Schema, model } from "mongoose";
import passportmongoose from "passport-local-mongoose";

const UserSchema = new Schema({
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
export default model("Users", UserSchema);
