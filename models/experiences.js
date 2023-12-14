"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      experiences.belongsTo(models.users);
      models.users.hasMany(experiences);
    }
  }
  experiences.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      date: DataTypes.STRING,
      tags: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "experiences",
    }
  );
  return experiences;
};
