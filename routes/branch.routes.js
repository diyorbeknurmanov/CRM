const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/branch.controller");

const branch_router = require("express").Router();

branch_router.post("/", create);
branch_router.get("/", getAll);
branch_router.get("/:id", getOne);
branch_router.patch("/:id", update);
branch_router.delete("/:id", remove);

module.exports = branch_router;
