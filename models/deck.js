"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Deck extends Model {}

  Deck.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Name cannot be empty"
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "UserId must be filled"
          },
          notEmpty: {
            args: true,
            msg: "UserId cannot be empty"
          }
        }
      }
    },
    {
      sequelize,
      modelName: "Deck"
    }
  );

  Deck.associate = function(models) {
    // associations can be defined here
    Deck.belongsTo(models.User);
    Deck.hasMany(models.Card)
  };
  return Deck;
};
