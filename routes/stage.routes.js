const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/stage.controller");

const stage_router = require("express").Router();

stage_router.post("/", create);
stage_router.get("/", getAll);
stage_router.get("/:id", getOne);
stage_router.patch("/:id", update);
stage_router.delete("/:id", remove);

module.exports = stage_router;
