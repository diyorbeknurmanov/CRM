const branch_router = require("./branch.routes");
const divece = require("./deice.routes");
const group_router = require("./group.routes");
const group_stuff_router = require("./group_stuff.routes");
const lesson_router = require("./lesson.routes");
const lid_router = require("./lid.routes");
const otp_router = require("./otp.routes");
const paymnet_router = require("./payment.routes");
const reason_router = require("./reason.routes");
const role_router = require("./role.routes");
const stuff_router = require("./staff.routes");
const stage_router = require("./stage.routes");
const status_router = require("./status.routes");
const SG_router = require("./student_group.routes");
const students_router = require("./students.routes");
const student_lesson_router = require("./studet_lesson.routes");
const stuff_role_router = require("./stuff_role.routes");

const router = require("express").Router();

router.use("/stage", stage_router);
router.use("/stuff", stuff_router);
router.use("/branch", branch_router);
router.use("/role", role_router);
router.use("/status", status_router);
router.use("/reason", reason_router);
router.use("/group", group_router);
router.use("/divice", divece);
router.use("/lid", lid_router);
router.use("/students", students_router);
router.use("/payment", paymnet_router);
router.use("/lesson", lesson_router);
router.use("/sutudent_lesson", student_lesson_router);
router.use("/sutudent_group", SG_router);
router.use("/otp", otp_router);
router.use("/stuff_role", stuff_role_router);
router.use("/group_stuff", group_stuff_router);

module.exports = router;
