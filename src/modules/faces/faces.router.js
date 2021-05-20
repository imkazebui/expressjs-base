import nodemailer from "nodemailer";
import { Router } from "express";
import FacesModel from "./faces.model.js";

const emailSender = "groupnhatnguyet@gmail.com";

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

    if (body.isStranger) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailSender,
          pass: "Aa123456!",
        },
      });

      const mailOptions = {
        from: emailSender,
        to: "buithanhphuong.it@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    res.sendStatus(204);
  } catch (e) {
    console.log("e", e);
    console.log("e.messages", e.message);
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
