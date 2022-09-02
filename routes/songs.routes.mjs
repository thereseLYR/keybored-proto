import { Router } from "express";
import SongController from "../controllers/songs.controller.mjs";
import UserController from "../controllers/users.controller.mjs";
import db from "../models/index.model.mjs";

const router = Router();
const userController = new UserController(db);
const songsController = new SongController(db, userController);

router.post("/api/songs", songsController.postNewSong);
router.get("/api/songs", songsController.getAllSongs);
router.get("/api/songs/:song_id", songsController.getSongByID);

export default router;
