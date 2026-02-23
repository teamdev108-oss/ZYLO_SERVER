import { User } from "../../../model/user.model.js";
import genCookie from "../../../utils/generateCookie/index.js";
import sendResponse from "../../../utils/sendResponse/index.js";
import {
  registerUserValidator,
  loginUserValidator,
} from "../../../utils/validator/auth/index.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  try {
    const result = registerUserValidator.safeParse(req.body);

    if (!result.success) {
      return sendResponse(res, 400, result.error.issues[0].message);
    }

    const { name, email, password } = result.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, "user already exists");
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

    return sendResponse(res, 200, "User Created Successfully", {
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = loginUserValidator.safeParse(req.body);

    if (!result.success) {
      return sendResponse(res, 400, result.error.issues[0].message);
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, "Invalid  Email or Password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendResponse(res, 401, "Invalid  Email or Password");
    }
    const token = genCookie(res, user._id);
    user.refreshToken = token;
    await user.save();

    return sendResponse(res, 200, "User Logged In Successfully", {
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verifyCode } = req.body;

    const user = await User.findOne({
      verifyCode,
      verifyCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return sendResponse(res, 400, "Invalid Verification Code");
    }

    const token = genCookie(res, user._id);
    user.refreshToken = token;
    user.verifyCode = undefined;
    user.verifyCodeExpires = undefined;
    user.isVerified = true;

    await user.save();

    return sendResponse(res, 200, "User Verified Successfully", {
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, 400, "User Not Found");
    }

    res.clearCookie("refreshToken");
    user.refreshToken = undefined;
    await user.save();
    return sendResponse(res, 200, "Logged Out Successfully");
  } catch (error) {
    next(error);
  }
};
