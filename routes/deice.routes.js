const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/divece.controller");

const divece = require("express").Router();

divece.post("/", create);
divece.get("/", getAll);
divece.get("/:id", getOne);
divece.patch("/:id", update);
divece.delete("/:id", remove);

module.exports = divece;
