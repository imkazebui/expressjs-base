import Sequelize from "sequelize";
import dbConfig from "./db.config.js";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
