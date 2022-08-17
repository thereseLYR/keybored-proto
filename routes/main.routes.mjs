import { resolve } from "path";
import { Router } from "express";

const router = Router();

// TODO: Change when login page is ready. GET main router as entry point for now
const main = (request, response) => {
  response.sendFile(resolve("dist", "main.html"));
};

router.get("/", main);

export default router;
