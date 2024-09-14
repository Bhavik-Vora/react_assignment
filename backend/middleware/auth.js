import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.todotoken;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Restricted Route: Please Log In to Proceed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
