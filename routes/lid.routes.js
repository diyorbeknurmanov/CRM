const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/lid.controller");

const lid_router = require("express").Router();

lid_router.post("/", create);
lid_router.get("/", getAll);
lid_router.get("/:id", getOne);
lid_router.patch("/:id", update);
lid_router.delete("/:id", remove);

module.exports = lid_router;
