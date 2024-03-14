const path = require("path");
const {
  fileUploadError,
  goodsPublishError,
  goodsInvalidId,
  goodsRemoveError,
  goodsRestoreError,
} = require("../constant/err.type");
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
} = require("../service/goods.service");
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

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "update goods success",
          result: ctx.request.body,
        };
      } else {
        return ctx.app.emit("error", goodsInvalidId, ctx);
      }
    } catch (error) {
      console.log("error :>> ", error);
      return ctx.app.emit("error", goodsPublishError, ctx);
    }
  }

  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id);
      console.log("remove -> res", res);
      if (!res) {
        return ctx.app.emit("error", goodsRemoveError, ctx);
      }
      ctx.body = {
        code: 0,
        message: "remove goods success",
        result: "",
      };
    } catch (error) {
      return ctx.app.emit("error", goodsRemoveError, ctx);
    }
  }

  async restore(ctx) {
    const res = await restoreGoods(ctx.params.id);
    if (!res) {
      return ctx.app.emit("error", goodsRestoreError, ctx);
    } else {
      ctx.body = {
        code: 0,
        message: "restore goods success",
        result: "",
      };
    }
  }
}

module.exports = new GoodsController();
