import jwt from "jsonwebtoken";
import sendResponse from "../sendResponse/index.js";

const genCookie = (res, userId) => {
  if (!userId) {
    return sendResponse(400, "provide userId");
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("refreshToken", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d in ms
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "dev",
  });
  return token;
};

export default genCookie;
