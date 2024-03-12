const path = require("path");
const { fileUploadError } = require("../constant/err.type");

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
}

module.exports = new GoodsController();
