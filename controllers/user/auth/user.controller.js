import { User } from "../../../model/user.model.js";
import genCookie from "../../../utils/generateCookie/index.js";
import sendResponse from "../../../utils/sendResponse/index.js";
import registerUserValidator from "../../../utils/validator/auth/registerUser.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  try {
    const { data, err } = registerUserValidator.safeParse(req.body);

    let error;
    if (err) {
      error = err.errors[0].message;
     return sendResponse(res, 400, error)
      
    }

    const { name, email, password } = data;

    const existingUser = User.findOne({ email });
    if (existingUser) {
     return sendResponse(res,400, "user already exists");
    }

    const hashpass = await bcrypt.hash(password, 10);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      password: hashpass,
      verifyCode,
      verifyCodeExpires: Date.now() + 10 * 60 * 1000,
    });

    const token = genCookie(res, user._id);
    user.refreshToken = token;
    await user.save();

    return sendResponse(res,200, "User Created Successfully", {
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next();
  }
};
