const Router = require("koa-router");
const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const router = new Router({ prefix: "/goods" });
const { upload, create } = require("../controller/goods.controller");

router.post("/upload", auth, hasAdminPermission, upload);

router.post("/", auth, hasAdminPermission, validator, create);

module.exports = router;
