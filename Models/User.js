import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  selectedFiled: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UserModal = mongoose.model("Users", UserSchema);
export default UserModal;
