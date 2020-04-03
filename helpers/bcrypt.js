const bcrypt = require("bcrypt");

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, Number(process.env.SALT));
  },
  checkPassword(inputPassword, hashedPassword) {
    return bcrypt.compareSync(inputPassword, hashedPassword);
  }
};
