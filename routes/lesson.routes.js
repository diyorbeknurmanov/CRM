const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/lesson.controller");

const lesson_router = require("express").Router();

lesson_router.post("/", create);
lesson_router.get("/", getAll);
lesson_router.get("/:id", getOne);
lesson_router.patch("/:id", update);
lesson_router.delete("/:id", remove);

module.exports = lesson_router;
