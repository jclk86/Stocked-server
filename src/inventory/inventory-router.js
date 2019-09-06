const express = require("express");
const InventoryService = require("./inventory-service");
const inventoryRouter = express.Router();
const bodyParser = express.json();

// /api/inventory/:userId or /api/:userId/inventory

// we need getUsers for this base route
inventoryRouter.route("/").get((req, res, next) => {
  InventoryService.getInventory(req.app.get("db")).then(items =>
    res.json(items)
  );
});

// for each route return the data you need

module.exports = inventoryRouter;
// find a way to query for userId itemId. My guess user_items joined with stocked_items select *
