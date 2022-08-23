import { Router } from "express";

import db from "../models/index.mjs";
import initSongsController from "../controllers/songs.controller.mjs";

const router = Router();

const userController = initSongsController(db);

router.post("/save", userController.postNewSong);

export default router;
