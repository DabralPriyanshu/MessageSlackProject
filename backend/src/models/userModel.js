import mongoose from "mongoose";
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
      require: [true, "Username is required"],
      unique: true,
    },
    avatar: { type: String },
  },
  { timestamps: true },
);
userSchema.pre("save", function saveUser(next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
