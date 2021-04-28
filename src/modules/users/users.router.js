import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    res.status(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
