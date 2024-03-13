const path = require("path");
const { fileUploadError, goodsPublishError } = require("../constant/err.type");
const { createGoods } = require("../service/goods.service");
class GoodsController {
  async upload(ctx) {
    const { file } = ctx.request.files;

    if (file) {
      ctx.body = {
        code: 0,
        message: "upload success",
        result: {
          url: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }

  async create(ctx) {
    try {
      const { createdAt, updatedAt, ...rest } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: "create goods success",
        result: rest,
      };
    } catch (error) {
      console.log("error :>> ", error);
      return ctx.app.emit("error", goodsPublishError, ctx);
    }
  }
}

module.exports = new GoodsController();
