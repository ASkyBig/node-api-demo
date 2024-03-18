const Router = require("koa-router");
const router = new Router({ prefix: "/carts" });
const { auth } = require("../middleware/auth.middleware");
const {
  validator,
  goodsIdValidator,
} = require("../middleware/cart.middleware");
const { add, findAll, update } = require("../controller/cart.controller");

router.post("/", auth, validator({ goods_id: "number" }), add);

router.get("/", auth, findAll);

router.patch(
  "/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "boolean", required: false },
  }),
  update
);

module.exports = router;
