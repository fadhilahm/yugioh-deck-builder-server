"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email is already taken"
        },
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Email must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty"
          },
          isEmail: {
            args: true,
            msg: "Email must be a valid email"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Username must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Username cannot be empty"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Password cannot be empty"
          },
          min: {
            args: [3],
            msg: "Password must contains at least 3 characters"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        }
      },
      sequelize,
      modelName: "User"
    }
  );

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Deck);
  };
  return User;
};
