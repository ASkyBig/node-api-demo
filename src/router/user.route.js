const Router = require("koa-router");
const { register, login } = require("../controller/user.controller");
const {
  userValidator,
  verifyUser,
  verifyLogin,
  cryptPassword,
} = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });
router.post("/register", userValidator, verifyUser, cryptPassword, register);
router.post("/login", userValidator, verifyLogin, login);

router.get("/", (ctx) => {
  ctx.body = "This is the users endpoint1";
});

module.exports = router;
