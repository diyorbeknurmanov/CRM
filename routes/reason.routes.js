const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/reason.controller");

const reason_router = require("express").Router();

reason_router.post("/", create);
reason_router.get("/", getAll);
reason_router.get("/:id", getOne);
reason_router.patch("/:id", update);
reason_router.delete("/:id", remove);

module.exports = reason_router;
