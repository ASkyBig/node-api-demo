const {
  createOrUpdate,
  findCart,
  updateCarts,
} = require("../service/cart.service");
const { cartAddError, cartFindError } = require("../constant/err.type");

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

  async findAll(ctx) {
    const { pageNum, pageSize } = ctx.query;
    try {
      const res = await findCart({ pageNum, pageSize });
      ctx.body = {
        code: 0,
        message: "get cart success",
        result: res,
      };
    } catch (error) {
      return ctx.app.emit("error", cartFindError, ctx);
    }
  }

  async update(ctx) {
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;
    if (!number && !selected) {
      cartFormatError.message = "number or selected is required";
      return ctx.app.emit("error", cartFormatError, ctx);
    }
    const res = await updateCarts({ id, number, selected });

    ctx.body = {
      code: 0,
      message: "update cart success",
      result: res,
    };
  }
}

module.exports = new CartController();
