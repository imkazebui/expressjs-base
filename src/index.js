import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// const passport = require("passport");

import db from "./config/database.js";

import { errorHandler } from "./middleware/error.js";
import { notFoundHandler } from "./middleware/not-found.js";

// import configPassport from "./config/passport";

import { usersRouter } from "./modules/users/users.router.js";

const __dirname = path.resolve(path.dirname(""));
const app = express();
const port = 3000;

try {
  await db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

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
  res.send("Hello World!");
});

app.use("/user", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
