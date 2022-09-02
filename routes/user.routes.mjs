import { Router } from "express";

import UserController from "../controllers/users.controller.mjs";
import db from "../models/index.model.mjs";

const router = Router();

const userController = new UserController(db);

router.post("/api/register", userController.postNewUser);
router.post("/api/login", userController.postLoginSession);

export default router;
