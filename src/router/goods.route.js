const Router = require("koa-router");
const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const router = new Router({ prefix: "/goods" });
const {
  upload,
  create,
  update,
  remove,
} = require("../controller/goods.controller");

router.post("/upload", auth, hasAdminPermission, upload);

router.post("/", auth, hasAdminPermission, validator, create);

router.put("/:id", auth, hasAdminPermission, validator, update);

router.delete("/:id", auth, hasAdminPermission, remove);

module.exports = router;
