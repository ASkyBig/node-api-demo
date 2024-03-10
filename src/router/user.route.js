const Router = require("koa-router");
const { register, login } = require("../controller/user.controller");
const { userValidator, verifyUser } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });
router.post("/register", userValidator, verifyUser, register);
router.post("/login", login);

router.get("/", (ctx) => {
  ctx.body = "This is the users endpoint1";
});

module.exports = router;
