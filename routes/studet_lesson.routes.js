const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/student_lesson.controller");

const student_lesson_router = require("express").Router();

student_lesson_router.post("/", create);
student_lesson_router.get("/", getAll);
student_lesson_router.get("/:id", getOne);
student_lesson_router.patch("/:id", update);
student_lesson_router.delete("/:id", remove);

module.exports = student_lesson_router;
