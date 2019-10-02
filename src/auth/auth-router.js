const express = require("express");
const AuthService = require("./auth-service");
const { requireAuth } = require("../middleware/jwt-auth");
const authRouter = express.Router();
const bodyParser = express.json();

authRouter.post("/login", bodyParser, (req, res, next) => {
  const { username, password } = req.body;
  const loginUser = { username, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });

  AuthService.getUserWithUserName(req.app.get("db"), loginUser.username)
    .then(dbUser => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect username or password"
        });
      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then(compareMatch => {
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect username or password"
          });
        // user_id is sent in payload to be extracted and used in client.
        const sub = dbUser.username;
        const userId = { id: dbUser.id };
        const payload = { sub: dbUser.id };
        res.send({
          authToken: AuthService.createJwt(sub, payload),
          id: userId
        });
      });
    })
    .catch(next);
});

authRouter.post("/refresh", requireAuth, (req, res) => {
  const sub = req.user.username;
  const payload = { user_id: req.user.id };
  res.send({
    authToken: AuthService.createJwt(sub, payload)
  });
});

module.exports = authRouter;
