const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/student_group.controller");

const SG_router = require("express").Router();

SG_router.post("/", create);
SG_router.get("/", getAll);
SG_router.get("/:id", getOne);
SG_router.patch("/:id", update);
SG_router.delete("/:id", remove);

module.exports = SG_router;
