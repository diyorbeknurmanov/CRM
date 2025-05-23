const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/group.controller");

const group_router = require("express").Router();

group_router.post("/", create);
group_router.get("/", getAll);
group_router.get("/:id", getOne);
group_router.patch("/:id", update);
group_router.delete("/:id", remove);

module.exports = group_router;
