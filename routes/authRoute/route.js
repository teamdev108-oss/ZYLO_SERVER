import { Router } from "express";
import {
  createUser,
  login,
  logoutUser,
  verifyEmail,
} from "../../controllers/user/auth/user.controller.js";

const route = Router();

route.post("/register/user", createUser);
route.post("/login/user", login);
route.post("/logout/user", logoutUser);
route.post("/verify/user", verifyEmail);

export default route;
