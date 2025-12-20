import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
  },
  username: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  action: {
    type: String,
    default: "user_created",
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

export default User;
