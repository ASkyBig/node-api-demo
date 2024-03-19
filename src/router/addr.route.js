const Router = require("koa-router");

const router = new Router({ prefix: "/address" });

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/addr.middleware");
const { create, findAll, update } = require("../controller/addr.controller");

router.post(
  "/",
  auth,
  validator({
    consignee: { type: "string", required: true },
    phone: { type: "string", format: /^1\d{10}$/, required: true },
    address: { type: "string", required: true },
  }),
  create
);

router.get("/", auth, findAll);

router.put(
  "/:id",
  auth,
  validator({
    consignee: { type: "string", required: true },
    phone: { type: "string", format: /^1\d{10}$/, required: true },
    address: { type: "string", required: true },
  }),
  update
);

module.exports = router;
