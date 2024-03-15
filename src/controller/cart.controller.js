const { createOrUpdate } = require("../service/cart.service");
const { cartAddError } = require("../constant/err.type");

class CartController {
  async add(ctx) {
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    console.log("user_id :>> ", user_id);
    console.log("goods_id :>> ", goods_id);
    try {
      const res = await createOrUpdate(user_id, goods_id);
      ctx.body = {
        code: 0,
        message: "add cart success",
        result: res,
      };
    } catch (error) {
      return ctx.app.emit("error", cartAddError, ctx);
    }

    // try {
    //   const res = await addCart(user_id, goods_id);
    //   ctx.body = {
    //     code: 0,
    //     message: "add cart success",
    //     result: res,
    //   };
    // } catch (error) {
    //   return ctx.app.emit("error", cartAddError, ctx);
    // }
  }
}

module.exports = new CartController();
