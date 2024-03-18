const {
  goodsFormatError,
  goodsInvalidId,
  cartFormatError,
} = require("../constant/err.type");
const { findGoodsById } = require("../service/goods.service");

// const validator = async (ctx, next) => {
//   try {
//     ctx.verifyParams({
//       goods_id: { type: "number", required: true },
//       // goods_num: { type: "number", required: true },
//     });
//   } catch (error) {
//     ctx.app.emit("error", goodsFormatError, ctx);
//     return;
//   }
//   await next();
// };

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      cartFormatError.result = error;
      ctx.app.emit("error", cartFormatError, ctx);
      return;
    }
    await next();
  };
};

const goodsIdValidator = async (ctx, next) => {
  // 检查商品id是否在数据库中
  const { goods_id } = ctx.request.body;
  const goods = await findGoodsById(goods_id);
  if (!goods) {
    ctx.app.emit("error", goodsInvalidId, ctx);
    return;
  }
  await next();
};

module.exports = {
  validator,
  goodsIdValidator,
};
