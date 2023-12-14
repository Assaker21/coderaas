"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      projects.belongsTo(models.users);
      models.users.hasMany(projects);
    }
  }
  projects.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      img: DataTypes.STRING,
      tags: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "projects",
    }
  );
  return projects;
};
