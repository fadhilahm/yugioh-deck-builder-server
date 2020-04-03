"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Cards", ["DeckId"], {
      type: "foreign key",
      name: "fkey_DeckId_Cards",
      references: {
        //Required field
        table: "Decks",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Cards", "fkey_DeckId_Cards");
  }
};
