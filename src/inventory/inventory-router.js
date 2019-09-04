const express = require("express");

const inventoryRouter = express.Router();
const bodyParser = express.json();

const Data = require("../mockData");

inventoryRouter.route("/").get((req, res, next) => {
  res.json(Data);
});

module.exports = inventoryRouter;
