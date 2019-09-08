const express = require("express");
const tagsRouter = express.Router();
const TagsService = require("./tags-service");
const xss = require("xss");

const serializeTag = tag => ({
  name: xss(tag.name)
});
// look at noted-server
tagsRouter.route("/").get((req, res, next) => {
  TagsService.getAllTags(req.app.get("db")).then(tags => {
    res.json(tags);
  });
});

tagsRouter.route("/:name").get((req, res, next) => {
  const { name } = req.params;
  TagsService.getByName(req.app.get("db"), name).then(tag => {
    res.json(tag);
  });
});

module.exports = tagsRouter;
