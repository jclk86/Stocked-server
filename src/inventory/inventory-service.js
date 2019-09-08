const xss = require("xss");

const InventoryService = {
  getUserInventory(db, user_id) {
    return db
      .from("user_items AS u")
      .join("stocked_users AS su", "u.user_id", "=", "su.id")
      .join("stocked_items AS si", "u.item_id", "=", "si.id")
      .join("stocked_tags as st", "si.tag", "st.name")
      .select(
        "u.user_id",
        "u.item_id",
        "su.username",
        "su.id",
        "si.name",
        "si.quantity",
        "si.image_url",
        "si.unit",
        "si.cost",
        "si.desc",
        "si.date_modified",
        "st.name"
      )
      .where("user_id", user_id);
  }
};

module.exports = InventoryService;

// d

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
