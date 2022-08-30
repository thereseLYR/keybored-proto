import { Router } from "express";
import { resolve } from "path";

const router = Router();

const main = (request, response) => {
  response.sendFile(resolve("dist", "main.html"));
};

router.get("*", main);

export default router;
