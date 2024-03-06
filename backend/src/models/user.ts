import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// create user type
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
// create user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
// encrypt the password before every registration save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
// define the User to mongoose to create new one
const User = mongoose.model<UserType>("User", userSchema);

export default User;
