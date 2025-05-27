const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/group_stuff.controller");

const group_stuff_router = require("express").Router();

group_stuff_router.post("/", create);
group_stuff_router.get("/", getAll);
group_stuff_router.get("/:id", getOne);
group_stuff_router.patch("/:id", update);
group_stuff_router.delete("/:id", remove);

module.exports = group_stuff_router;
