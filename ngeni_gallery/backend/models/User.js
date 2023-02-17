import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: false },
  password: { type: String, required: false},
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    required: false,
  },
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

export const findOne = async (query) => {
  return await User.findOne(query);
};

export const find = async () => {
  return await User.find();
};

export default User;
