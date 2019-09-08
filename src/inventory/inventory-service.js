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
  },
  getByUserIdAndItemId(db, user_id, item_id) {
    // return db.from("stocked_items").select("*").where("id", id).first();
    //not sure if you actually need to get userId with all of this, when likely, the db you fetched only includes the user's inventory anyways.
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
    .where("u.item_id", item_id)
    .andWhere("u.user_id", user_id);
  },
  // Note: you may pmay not need to incorporate the userId for this. 
  updateItem(db, id, newItemFields) {
    return db.from("stocked_items")
    .where({id})
    .update(newItemFields);
  },
  deleteItem(db, id) {
    return db.from({id}).del();
  },
  insertItem(db, newItem) {
    return db.insert(newItem).into("stocked_items").returning("*")
    .then(rows => {
      return rows[0]
    });
  },
  // make sure this is actually accepting an object or if it needs to 
  // also, keep an eye on the "desc" if it needs the quotations or not 
  serializeItem(item) {
    return {
      id: item.id,
      name: item.name,
      desc: item.desc,
      image_url: item.image_url,
      quantity: item.quantity,
      cost: item.cost,
      date_modified: item.date_modified,
      unit: item.unit,
      tag: item.tag
    }
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
