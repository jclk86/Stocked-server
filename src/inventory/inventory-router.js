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
})
.post(bodyParser, (req, res, next) => {
  const { name, quantity, image_url, desc, cost, unit, tag  } = req.body 
  const newItem = { name, quantity, image_url, desc, cost, unit, tag };
  for(const [key, value] of Object.entries(newItem)) 
    if(value == null) {
      return res.status(400).json({
        error: `Missing '${key}' in request body` 
      })
    // need an id? newItem.id = req.id? 
    InventoryService.insertItem(req.app.get("db"), newItem).then(item => {
      res.status(201)
      .location(req.originalUrl, `/${item.id}`)
      .json(item) // MUST SERIALIZE
    })

  }
})

inventoryRouter.route("/:user_id/:item_id").get((req, res, next) => {
  const { item_id, user_id } = req.params;
  InventoryService.getByUserIdAndItemId(req.app.get("db"), user_id, item_id).then(item => res.json(item))
 })

 
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
