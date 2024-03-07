const Router = require("koa-router");
const { register, login } = require("../controller/user.controller");

const router = new Router({ prefix: "/users" });
router.post("/register", register);
router.post("/login", login);

router.get("/", (ctx) => {
  ctx.body = "This is the users endpoint1";
});

module.exports = router;
