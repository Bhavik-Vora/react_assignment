import jwt from "jsonwebtoken";

export const cookieOptions = {
  maxAge: 1 * 24 * 60 * 60 * 1000,
  sameSite: "None",
  httpOnly: true,
  secure: false,
};
export const sendToken = (res, user, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET, {
    expiresIn: "1d",
  });
  return res.status(statusCode).cookie("todotoken", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};
