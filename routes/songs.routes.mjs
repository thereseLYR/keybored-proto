import { Router } from "express";

import initSongsController from "../controllers/songs.controller.mjs";
import db from "../models/index.model.mjs";

const router = Router();

const songsController = initSongsController(db);

router.post("/songs", songsController.postNewSong);
router.get("/songs", songsController.getAllSongs);
// todo: add /songs/song_id to retrieve a specific song

export default router;
