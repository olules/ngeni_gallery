import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: false },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    required: false,
  },
});

export const User = mongoose.model("User", userSchema);

export const findOne = async (query) => {
  return await User.findOne(query);
};

export const find = async () => {
  return await User.find();
};

export default User;
