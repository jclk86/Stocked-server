const express = require("express");
const tagsRouter = express.Router();
const TagsService = require("./tags-service");

tagsRouter.route("/").get((req, res, next) => {
  TagsService.getAllTags(req.app.get("db"))
    .then(tags => {
      res.json(tags);
    })
    .catch(next);
});

tagsRouter.route("/:tag_name/inventory").get((req, res, next) => {
  const { tag_name } = req.params;
  TagsService.getByName(req.app.get("db"), tag_name).then(tag => {
    res.json(tag);
  });
});

// Try filtering in react before building routes

module.exports = tagsRouter;
