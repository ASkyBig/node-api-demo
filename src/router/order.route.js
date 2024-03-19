const Router = require("koa-router");
const { auth } = require("../middleware/auth.middleware");
const router = new Router({ prefix: "/orders" });
const { validator } = require("../middleware/order.middleware");
const { create, findAll, update } = require("../controller/order.controller");

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

router.patch(
  "/:id",
  auth,
  validator({ status: { type: "int", required: true } }),
  update
);

module.exports = router;
