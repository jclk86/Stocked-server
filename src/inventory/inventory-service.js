const xss = require("xss");

const InventoryService = {
  getUserInventory(db, user_id) {
    return db
      .from("user_items")
      .select("*")
      .where("user_id", user_id);
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
