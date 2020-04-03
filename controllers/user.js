const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    let { email, username, password } = req.body;
    User.create({
      email,
      username,
      password
    })
      .then(created => {
        res.status(201).json({
          msg: "Successfully created a new User",
          data: {
            id: created.id,
            email: created.email,
            username: created.username
          }
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then(found => {
        if (found) {
          // match password
          if (checkPassword(password, found.password)) {
            res.status(200).json({
              msg: "Successfully logged in",
              token: generateToken({
                id: found.id,
                email: found.email,
                username: found.username
              }),
              data: {
                id: found.id,
                email: found.email,
                username: found.username
              }
            });
          } else {
            next({
              status: 400,
              msg: "Email / Password was wrong"
            });
          }
        } else {
          // not found
          next({
            status: 400,
            msg: "Email / Password was wrong"
          });
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
