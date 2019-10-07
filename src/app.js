const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const inventoryRouter = require("./inventory/inventory-router");
const tagsRouter = require("./tags/tags-router");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(
  morgan(morganOption, {
    skip: () => NODE_ENV === "test"
  })
);
app.use(helmet());
app.use(cors());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/api/user", inventoryRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/register", usersRouter);
app.use("/api/auth", authRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
