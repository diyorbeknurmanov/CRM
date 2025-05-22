const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/role.controller");

const role_router = require("express").Router();

role_router.post("/", create);
role_router.get("/", getAll);
role_router.get("/:id", getOne);
role_router.patch("/:id", update);
role_router.delete("/:id", remove);

module.exports = role_router;
