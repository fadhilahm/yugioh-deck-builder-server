const { verifyToken } = require("../helpers/jwt");

module.exports = {
  authentification(req, res, next) {
    try {
      req.decoded = verifyToken(req.headers.token);
      next();
    } catch (err) {
      next({
        status: 401,
        msg: "Unauthorized, please log in first"
      });
    }
  }
};
