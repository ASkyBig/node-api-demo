const { createOrder } = require("../service/order.service");

class OrderController {
  async create(ctx) {
    console.log("ctx :>> ", ctx.state.user);
    const { id: user_id } = ctx.state.user;
    const { address_id, goods_info, total } = ctx.request.body;

    const order_number = "YJ" + Date.now() + user_id;
    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number,
    });
    ctx.body = {
      code: 0,
      message: "create order success",
      result: res,
    };
  }
}

module.exports = new OrderController();
