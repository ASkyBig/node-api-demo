const Router = require("koa-router");
const { auth, hasAdminPermission } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/goods" });
const { upload } = require("../controller/goods.controller");

router.post("/upload", auth, hasAdminPermission, upload);

module.exports = router;
