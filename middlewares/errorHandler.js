module.exports = {
  errorHandler(err, req, res, next) {
    if (err.name === "SequelizeValidationError") {
      let validateError = err.errors.map(el => el.message);
      res.status(400).json({
        status: 400,
        msg: validateError
      });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      let uniqueError = err.errors.map(el => el.message);
      res.status(400).json({
        status: 400,
        msg: uniqueError
      });
    } else {
      res.status(err.status || 500).json({
        status: err.status || 500,
        msg: err.msg || "Internal Server Error"
      });
    }
  }
};
