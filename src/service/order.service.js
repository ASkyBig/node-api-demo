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
}

module.exports = new OrderService();
