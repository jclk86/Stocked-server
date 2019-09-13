const express = require("express");
const path = require("path");

const UsersService = require("./users-service");

const usersRouter = express.Router();
const bodyParser = express.json();

usersRouter.post("/", bodyParser, (req, res, next) => {
  const { password, username, fullname, email } = req.body;

  for (const field of ["password", "username", "fullname", "email"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
  const passwordError = UsersService.validatePassword(password);

  if (passwordError) return res.status(400).json({ error: passwordError });

  UsersService.hashPassword(password)
    .then(hashedPassword => {
      const newUser = {
        username,
        password: hashedPassword,
        fullname,
        email,
        date_created: "now()"
      };

      return UsersService.insertUser(req.app.get("db"), newUser).then(user => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${user.id}/inventory`))
          .json(UsersService.serializeUser(user));
      });
    })
    .catch(next);
});

module.exports = usersRouter;
