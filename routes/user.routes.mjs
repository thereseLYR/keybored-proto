import { Router } from "express";

import UserController from "../controllers/users.controller.mjs";
import db from "../models/index.model.mjs";

const router = Router();

const userController = new UserController(db);

router.post("/register", userController.postNewUser);
router.post("/login", userController.postLoginSession);

export default router;
