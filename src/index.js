import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// const passport = require("passport");

import mongoose from "mongoose";

import { errorHandler } from "./middleware/error.js";
import { notFoundHandler } from "./middleware/not-found.js";

// import configPassport from "./config/passport";

import { usersRouter } from "./modules/users/users.router.js";
import { facesRouter } from "./modules/faces/faces.router.js";

const __dirname = path.resolve(path.dirname(""));
const app = express();
const port = process.env.PORT || 3000;
const dbUrl =
  "mongodb+srv://nhatnguyet:hackthoaimaidibanoi@cluster0.c8h20.mongodb.net/detect-face?retryWrites=true&w=majority";

// configPassport(passport);

// adding Helmet to enhance your API's security
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

app.use("/api", usersRouter);
app.use("/api", facesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

mongoose
  .connect(dbUrl)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((error) => {
    throw error;
  });
