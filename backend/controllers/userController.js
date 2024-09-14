import { User } from "../models/userModel.js";
import { cookieOptions, sendToken } from "../utils/sendToken.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let user = await User.findOne({ email });
  if (user) return res.status(401).json({ message: "User Already Exists" });

  const hashedPassword = await bcryptjs.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  sendToken(res, user, "User Registered Successfully", 201);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(401).json({
      message: "Oops! Invalid Username or Password. Please Try Again.",
    });

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({
      message: "Oops! Invalid Username or Password. Please Try Again.",
    });

  sendToken(res, user, `Welcome Back ${user.name}`, 200);
};

export const logout = (req, res, next) => {
  return res
    .status(200)
    .cookie("todotoken", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
