const Cart = require("../model/cart.model");
const { Op } = require("sequelize");

class CartService {
  async createOrUpdate(user_id, goods_id) {
    try {
      const res = await Cart.findOne({
        where: {
          [Op.and]: {
            user_id,
            goods_id,
          },
        },
      });

      console.log("createOrUpdate -> res", res);
      if (res) {
        await res.increment("goods_num");
        return await res.reload();
      } else {
        const cart = await Cart.create({
          user_id,
          goods_id,
        });
        return cart;
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
}

module.exports = new CartService();
