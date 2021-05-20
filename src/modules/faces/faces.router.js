import { Router } from "express";
import FacesModel from "./faces.model.js";

export const facesRouter = Router();

facesRouter.get("/", async (req, res) => {
  try {
    res.status(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

facesRouter.post("/detect-face", async (req, res) => {
  try {
    const body = req.body;

    const face = new FacesModel(body);
    await face.save();

    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

facesRouter.get("/detect-face", async (req, res) => {
  try {
    const allFace = await FacesModel.find();

    res.status(200).json({
      data: allFace,
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
});
