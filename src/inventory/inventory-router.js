const express = require("express");
const InventoryService = require("./inventory-service");
const inventoryRouter = express.Router();
const bodyParser = express.json();

// /api/inventory/:userId or /api/:userId/inventory

// we need getUsers for this base route
inventoryRouter.route("/:user_id").get((req, res, next) => {
  const { user_id } = req.params;
  InventoryService.getUserInventory(req.app.get("db"), user_id).then(items =>
    res.json(items)
  );
});

// inventoryRouter.route("/:user_id").get((req, res, next) => {
//   const { user_id } = req.params;
//   InventoryService.getTags(req.app.get("db")).then(tags => res.json(tags));
// });
// inventoryRouter.route("/:user_id/tags/:tag_id").get((req,res,next) => {
//   const { user_id, tag_id } = req.params;
//   InventoryService.getUserInventory(req.)
// })
// for each route return the data you need

module.exports = inventoryRouter;
// find a way to query for userId itemId. My guess user_items joined with stocked_items select *
