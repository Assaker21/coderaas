"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("experiences", {
      fields: ["userId"],
      type: "foreign key",
      name: "experience_user_association",
      references: {
        table: "users",
        field: "id",
      },
    });
    queryInterface.addConstraint("projects", {
      fields: ["userId"],
      type: "foreign key",
      name: "project_user_association",
      references: {
        table: "users",
        field: "id",
      },
    });
    queryInterface.addConstraint("social_medias", {
      fields: ["userId"],
      type: "foreign key",
      name: "social_medias_user_association",
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("experiences", {
      fields: ["userId"],
      type: "foreign key",
      name: "experience_user_association",
      references: {
        table: "users",
        field: "id",
      },
    });
    queryInterface.removeConstraint("projects", {
      fields: ["userId"],
      type: "foreign key",
      name: "project_user_association",
      references: {
        table: "users",
        field: "id",
      },
    });
    queryInterface.removeConstraint("social_medias", {
      fields: ["userId"],
      type: "foreign key",
      name: "social_medias_user_association",
      references: {
        table: "users",
        field: "id",
      },
    });
  },
};
