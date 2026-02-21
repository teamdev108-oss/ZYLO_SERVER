import { Router } from "express";
import { createUser } from "../../controllers/user/auth/user.controller.js";

const route = Router();

route.post("/register/user", createUser);

export default route;
