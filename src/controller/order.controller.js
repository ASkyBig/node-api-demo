const { createOrder, findAllOrder } = require("../service/order.service");

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

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.query;

    const res = await findAllOrder({ pageNum, pageSize, status });
    console.log("findAll -> res", res);
    ctx.body = {
      code: 0,
      message: "get order success",
      result: res,
    };
  }
}

module.exports = new OrderController();
