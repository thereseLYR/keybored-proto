import { Router } from "express";

import db from "../models/index.mjs";
import UserController from "../controllers/users.controller.mjs";

const router = Router();

const userController = new UserController(db);

// GET login as the first loading page
// GET register as the signup page
// POST register as the signup
router.post("/register", userController.postNewUser);
router.post("/session", userController.postLoginSession);

export default router;
