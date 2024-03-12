const Koa = require("koa");
const { koaBody } = require("koa-body");
const errHandler = require("./errHandler");

const router = require("../router");

// const userRouter = require("../router/user.route");
// const goodsRouter = require("../router/goods.route");

const app = new Koa();

app.use(koaBody());
// app.use(userRouter.routes());
// app.use(goodsRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

app.on("error", errHandler);
module.exports = app;
