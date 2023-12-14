"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class social_medias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      social_medias.belongsTo(models.users);
      models.users.hasMany(social_medias);
    }
  }
  social_medias.init(
    {
      social_app: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "social_medias",
    }
  );
  return social_medias;
};
