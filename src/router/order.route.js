const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const router = new Router({ prefix: "/orders" });
const { validator } = require("../middleware/order.middleware");
const { create, findAll } = require("../controller/order.controller");

router.post(
  "/",
  auth,
  validator({
    address_id: { type: "int", required: true },
    goods_info: { type: "string", required: true },
    total: { type: "string", required: true },
  }),
  create
);

router.get("/", auth, findAll);

module.exports = router;
