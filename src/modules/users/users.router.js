import { Router } from "express";
import UserModel from "./users.model.js";

export const usersRouter = Router();

usersRouter.post("/user", async (req, res) => {
  try {
    const body = req.body;

    const user = new UserModel(body);
    await user.save();

    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

usersRouter.put("/user", async (req, res) => {
  try {
    const body = req.body;

    await UserModel.findOneAndUpdate(
      {
        name: "phuong",
      },
      body,
      {
        useFindAndModify: false,
      }
    );

    res.sendStatus(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

usersRouter.get("/user", async (req, res) => {
  try {
    const allUser = await UserModel.find();

    res.status(200).json({
      data: allUser,
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
});
