import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
  }
  return next;
});

const User = mongoose.model("User", userSchema);

export default User;
