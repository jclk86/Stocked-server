const xss = require("xss");

const InventoryService = {
  getInventory(db) {
    return db.from("stocked_items").select("*");
  },
  getUserId(db) {
    return db.from("stocked_users").select("*");
  }
};

module.exports = InventoryService;

// getUserId(db, userId) {
//   return db("user_items").select("*").where
// },
// getItemById(db, id) {
//   return InventoryService.getInventory(db)
//     .where("id", id)
//     .first();
// },
// getTags(db) {
//   return db.from("stocked_tags").select("*");
// }
