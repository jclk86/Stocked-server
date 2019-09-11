const express = require("express");
const InventoryService = require("./inventory-service");
const inventoryRouter = express.Router();
const bodyParser = express.json();

inventoryRouter
  .route("/:user_id/inventory")
  .all(checkUserExists)
  .get((req, res, next) => {
    const { user_id } = req.params;
    InventoryService.getUserInventory(req.app.get("db"), user_id)
      .then(items => res.json(items.map(InventoryService.serializeItem)))
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { user_id } = req.params;
    const {
      name,
      quantity,
      image_url,
      desc,
      cost_per_unit,
      unit,
      tag
    } = req.body;
    const newItem = {
      name,
      user_id,
      quantity,
      image_url,
      desc,
      cost_per_unit,
      unit,
      tag,
      date_modified: new Date() // DB generates date. Remove this.
    };
    for (const [key, value] of Object.entries(newItem))
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
      }
    InventoryService.insertItem(req.app.get("db"), newItem).then(item => {
      res
        .status(201)
        .location(req.originalUrl, `/${item.user_id}/inventory/${item.item_id}`)
        .json(item);
    });
  });

inventoryRouter
  .route("/:user_id/inventory/:item_id")
  .all(checkUserExists)
  .all(checkUserItemExists)
  .get((req, res, next) => {
    const { item_id, user_id } = req.params;
    InventoryService.getByUserIdAndItemId(
      req.app.get("db"),
      user_id,
      item_id
    ).then(item => res.json(item.map(InventoryService.serializeItem))); // serialize this
  })
  .delete((req, res, next) => {
    const { item_id, user_id } = req.params;
    InventoryService.deleteItem(req.app.get("db"), item_id, user_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const {
      item_id,
      user_id,
      name,
      quantity,
      image_url,
      desc,
      cost_per_unit,
      unit,
      tag
    } = req.body;

    const itemToUpdate = {
      item_id,
      user_id,
      name,
      quantity,
      image_url,
      desc,
      cost_per_unit,
      unit,
      tag,
      date_modified: new Date()
    };

    const numOfValues = Object.values(itemToUpdate).filter(Boolean).length;

    if (numOfValues === 0) {
      return res.status(400).jsonp({
        error: {
          message: `Request body must contain either 'name,' 'quantity,' 'image_url,' 'desc,' 'cost_per_unit,' 'unit,' 'tag'`
        }
      });
    }
    InventoryService.updateItem(
      req.app.get("db"),
      req.params.item_id,
      req.params.user_id,
      itemToUpdate
    )
      .then(numOfRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

async function checkUserExists(req, res, next) {
  try {
    const user = await InventoryService.getUserById(
      req.app.get("db"),
      req.params.user_id
    );
    if (!user.length)
      return res.status(404).json({
        error: `User doesn't exist`
      });
    res.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkUserItemExists(req, res, next) {
  try {
    const userItem = await InventoryService.getByUserIdAndItemId(
      req.app.get("db"),
      req.params.user_id,
      req.params.item_id
    );
    if (!userItem.length)
      return res.status(404).json({
        error: `Item doesn't exist`
      });
    res.userItem = userItem;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = inventoryRouter;
