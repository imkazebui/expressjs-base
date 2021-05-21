import nodemailer from "nodemailer";
import { Router } from "express";
import FacesModel from "./faces.model.js";
import UserModel from "../users/users.model.js";

const emailSender = "groupnhatnguyet@gmail.com";

export const facesRouter = Router();

facesRouter.post("/detect-face", async (req, res) => {
  try {
    const body = req.body;

    const face = new FacesModel(body);
    await face.save();

    if (body.isStranger) {
      const user = await UserModel.findOne({ name: "phuong" });
      const html = `<p>Here is the face of stranger</p>`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailSender,
          pass: "Aa123456!",
        },
      });

      const mailOptions = {
        from: emailSender,
        to: user.emailPrimary,
        cc: user.emailOptional,
        subject: "Warning: Someone stranger in your home",
        html,
        attachments: [
          {
            filename: "stranger.png",
            path: `data:image/png;base64,${body.images}`,
          },
        ],
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

facesRouter.put("/detect-face/:id", async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    await FacesModel.findByIdAndUpdate({ _id: id }, body);

    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

facesRouter.get("/detect-face", async (req, res) => {
  try {
    const allFace = await FacesModel.find({}, null, {
      sort: {
        _id: -1,
      },
    });

    res.status(200).json({
      data: allFace,
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
});
