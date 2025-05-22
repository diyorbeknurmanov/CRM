const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/status.controller");

const status_router = require("express").Router();

status_router.post("/", create);
status_router.get("/", getAll);
status_router.get("/:id", getOne);
status_router.patch("/:id", update);
status_router.delete("/:id", remove);

module.exports = status_router;
