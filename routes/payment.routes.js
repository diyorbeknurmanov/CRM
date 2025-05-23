const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/payment.controller");

const paymnet_router = require("express").Router();

paymnet_router.post("/", create);
paymnet_router.get("/", getAll);
paymnet_router.get("/:id", getOne);
paymnet_router.patch("/:id", update);
paymnet_router.delete("/:id", remove);

module.exports = paymnet_router;
