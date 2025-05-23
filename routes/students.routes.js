const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/students.controller");

const students_router = require("express").Router();

students_router.post("/", create);
students_router.get("/", getAll);
students_router.get("/:id", getOne);
students_router.patch("/:id", update);
students_router.delete("/:id", remove);

module.exports = students_router;
