import { Router } from "express";
import {
  createUser,
  login,
  logoutUser,
} from "../../controllers/user/auth/user.controller.js";

const route = Router();

route.post("/register/user", createUser);
route.post("/login/user", login);
route.post("logout/user",logoutUser)

export default route;
