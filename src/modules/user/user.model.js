import Sequelize from "sequelize";
import db from "../../config/database.js";

const { sequelize } = db;
const { DataTypes } = Sequelize;

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
