const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaStatic = require("koa-static");
const parameter = require("koa-parameter");

const errHandler = require("./errHandler");

const router = require("../router");

// const userRouter = require("../router/user.route");
// const goodsRouter = require("../router/goods.route");

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../upload"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      onFileBegin: (name, file) => {
        const fp = path.join(__dirname, "../upload");
        if (!fs.existsSync(fp)) {
          fs.mkdirSync(fp);
        }
      },
    },
    parsedMethods: ["POST", "PUT", "PATCH", "GET", "HEAD", "DELETE"],
  })
);
app.use(koaStatic(path.join(__dirname, "../upload")));
app.use(parameter(app));
// app.use(userRouter.routes());
// app.use(goodsRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

app.on("error", errHandler);
module.exports = app;
