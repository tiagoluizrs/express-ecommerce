const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db.js");

const Category = db.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Category;
