const Order = require("../model/order.model");

class OrderService {
  async createOrder(order) {
    try {
      const res = await Order.create(order);
      return res;
    } catch (error) {
      console.log("createOrder error :>> ", error);
    }
  }

  async findAllOrder({ pageNum, pageSize, status }) {
    try {
      const { count, rows } = await Order.findAndCountAll({
        offset: (pageNum - 1) * pageSize,
        limit: pageSize * 1,
        attributes: ["goods_info", "order_number", "total", "status"],
        where: {
          status,
        },
      });
      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,
      };
    } catch (error) {
      console.log("findAllOrder error :>> ", error);
    }
  }
}

module.exports = new OrderService();
