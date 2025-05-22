const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/stuff.controller");

const stuff_router = require("express").Router();

stuff_router.post("/", create);
stuff_router.get("/", getAll);
stuff_router.get("/:id", getOne);
stuff_router.patch("/:id", update);
stuff_router.delete("/:id", remove);

module.exports = stuff_router;
