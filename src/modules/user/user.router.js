import { Router } from "express";
import UserService from "./user.service.js";

export const userRouter = Router();

const UserServiceInst = new UserService();

// Get all user
userRouter.get("/", async (req, res) => {
  try {
    const data = await UserServiceInst.getListUser();
    res.status(201).json(data);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// Create user
userRouter.post("/", async (req, res) => {
  try {
    await UserServiceInst.createUser(req.body);
    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// Delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    await UserServiceInst.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
