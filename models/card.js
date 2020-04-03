"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Card extends Model {}

  Card.init(
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
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Image URL must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Image URL cannot be empty"
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Quantity must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Quantity cannot be empty"
          },
          isInt: {
            args: true,
            msg: "Quantity must be a valid integer"
          },
          min: {
            args: [1],
            msg: "Quantity must be bigger than zero"
          },
          max: {
            args: [3],
            msg: "Quantity of a single card is limited to three"
          }
        }
      },
      DeckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "DeckId must be filled"
          },
          notEmpty: {
            args: true,
            msg: "DeckId cannot be empty"
          },
          isInt: {
            args: true,
            msg: "DeckId must be a valid integer"
          },
          min: {
            args: [1],
            msg: "DeckId must be bigger than zero"
          }
        }
      }
    },
    {
      sequelize,
      modelName: "Card"
    }
  );

  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.Deck);
  };
  return Card;
};
