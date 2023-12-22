"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pdfgenerators extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pdfgenerators.init(
    {
      type: DataTypes.TEXT,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "pdfgenerators",
    }
  );
  return pdfgenerators;
};
