const bcrypt = require("bcryptjs");
const xss = require("xss");

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  hasUserWithUserName(db, username) {
    return db("stocked_users")
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("stocked_users")
      .returning("*")
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password must be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty space";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain one upper case, lower case, number and special character";
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      fullname: xss(user.fullname),
      password: xss(user.password),
      username: xss(user.username),
      email: xss(user.email),
      password: xss(user.password),
      date_created: new Date(user.date_created)
    };
  }
};

module.exports = UsersService;
