const branch_router = require("./branch.routes");
const reason_router = require("./reason.routes");
const role_router = require("./role.routes");
const stuff_router = require("./staff.routes");
const stage_router = require("./stage.routes");
const status_router = require("./status.routes");

const router = require("express").Router();

router.use("/stage", stage_router);
router.use("/stuff", stuff_router);
router.use("/branch", branch_router);
router.use("/role", role_router);
router.use("/status", status_router);
router.use("/reason", reason_router);

module.exports = router;
