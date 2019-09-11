const xss = require("xss");

const InventoryService = {
  getUserInventory(db, user_id) {
    return db
      .from("stocked_items as si")
      .select(
        "si.user_id",
        "si.item_id",
        "si.name",
        "si.quantity",
        "si.image_url",
        "si.cost_per_unit",
        "si.unit",
        "si.desc",
        "si.date_modified",
        "si.tag"
      )
      .where("si.user_id", user_id);
  },

  getByUserIdAndItemId(db, user_id, item_id) {
    return db
      .from("stocked_items as si")
      .select(
        "si.user_id",
        "si.item_id",
        "si.name",
        "si.quantity",
        "si.image_url",
        "si.unit",
        "si.cost_per_unit",
        "si.desc",
        "si.date_modified",
        "si.tag"
      )
      .where({ user_id })
      .andWhere({ item_id });
  },

  getUserById(db, user_id) {
    return db.from("stocked_users as su").where("su.id", user_id);
  },

  updateItem(db, item_id, user_id, newItemFields) {
    return db
      .from("stocked_items")
      .where({ item_id })
      .andWhere({ user_id })
      .update(newItemFields);
  },

  deleteItem(db, item_id, user_id) {
    return db
      .from("stocked_items")
      .where({ item_id })
      .andWhere({ user_id })
      .del();
  },

  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into("stocked_items")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  serializeItem(item) {
    return {
      item_id: item.item_id,
      user_id: item.user_id,
      name: xss(item.name),
      desc: xss(item.desc),
      image_url: xss(item.image_url),
      quantity: item.quantity,
      cost_per_unit: item.cost_per_unit,
      date_modified: item.date_modified,
      unit: xss(item.unit),
      tag: item.tag
    };
  }
};

module.exports = InventoryService;
