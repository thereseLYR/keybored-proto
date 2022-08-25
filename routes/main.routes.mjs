import { resolve } from "path";
import { Router } from "express";

const router = Router();

const main = (request, response) => {
  response.sendFile(resolve("dist", "main.html"));
};

router.get("*", main);

export default router;
