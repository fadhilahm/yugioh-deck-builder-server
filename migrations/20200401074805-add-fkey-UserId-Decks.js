"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Decks", ["UserId"], {
      type: "foreign key",
      name: "fkey_UserId_Decks",
      references: {
        //Required field
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Decks", "fkey_UserId_Decks");
  }
};
