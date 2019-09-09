const xss = require("xss");
// the tables are wrong. no need for user-items. It's not a many to many relationsip, but 1 to many. so each item should have a user id

const InventoryService = {
  getUserInventory(db, user_id) {
    return db
      .from("stocked_users as su")
      .join("stocked_items as si", "su.id", "=", "si.user_id")
      .join("stocked_tags as st", "si.tag", "=", "st.name")
      .select(
        "su.username",
        "su.id",
        "si.item_id",
        "si.name",
        "si.quantity",
        "si.image_url",
        "si.unit",
        "si.cost",
        "si.desc",
        "si.date_modified",
        "st.name"
      )
      .where("si.user_id", user_id);
  },
  getByUserIdAndItemId(db, user_id, item_id) {
    // return db.from("stocked_items").select("*").where("id", id).first();
    //not sure if you actually need to get userId with all of this, when likely, the db you fetched only includes the user's inventory anyways.
    return (
      db
        .from("stocked_items as si")
        // .join("stocked_items as si", "su.id", "=", "si.user_id")
        // .join("stocked_tags as st", "si.tag", "=", "st.name")
        .select(
          "si.user_id",
          "si.item_id",
          "si.name",
          "si.quantity",
          "si.image_url",
          "si.unit",
          "si.cost",
          "si.desc",
          "si.date_modified",
          "si.tag"
        )
        .where("si.item_id", item_id)
        .andWhere("si.user_id", user_id)
    );
  },
  // Note: you may pmay not need to incorporate the userId for this.
  updateItem(db, item_id, newItemFields) {
    return db
      .from("stocked_items")
      .where({ item_id })
      .update(newItemFields);
  },
  deleteItem(db, item_id) {
    return db.from({ item_id }).del();
  },
  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into("stocked_items") // need 2 tables here ...
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  // make sure this is actually accepting an object or if it needs to
  // also, keep an eye on the "desc" if it needs the quotations or not
  serializeItem(item) {
    return {
      item_id: item.item_id,
      name: item.name,
      desc: item.desc,
      image_url: item.image_url,
      quantity: item.quantity,
      cost: item.cost,
      date_modified: item.date_modified,
      unit: item.unit,
      tag: item.tag
    };
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
