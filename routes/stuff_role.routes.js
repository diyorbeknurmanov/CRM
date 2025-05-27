const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/stuff_role.controller");

const stuff_role_router = require("express").Router();

stuff_role_router.post("/", create);
stuff_role_router.get("/", getAll);
stuff_role_router.get("/:id", getOne);
stuff_role_router.patch("/:id", update);
stuff_role_router.delete("/:id", remove);

module.exports = stuff_role_router;
