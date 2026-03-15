import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: { type: String, required: [true, "Password is required"] },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
  },
  { timestamps: true },
);
userSchema.pre("save", async function saveUser(next) {
  if (!this.isModified("password")) {
    return next;
  }
  this.password = await bcrypt.hash(this.password, 10);

  if (this.isNew) {
    this.avatar = `https://robohash.org/${this.username}`;
    this.verificationToken=uuidv4().substring(0,10).toUpperCase();
    this.verificationTokenExpiry=Date.now() + 3600000; // 1 hour
  }
  return next;
});

const User = mongoose.model("User", userSchema);

export default User;
