import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [5, "Password must be atleast 5 Characters"],
      select: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
