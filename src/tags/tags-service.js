const xss = require("xss");

const TagsService = {
  // the service to get allUserInventory is exported from inventory service to the tags router
  getAllTags(db) {
    return db.from("stocked_tags").select("*");
  },
  getByName(db, name) {
    return db
      .from("stocked_tags")
      .select("*")
      .where("name", name)
      .first();
  }
};

module.exports = TagsService;
