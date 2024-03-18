const Cart = require("../model/cart.model");
const { Op } = require("sequelize");
const Goods = require("../model/goods.model");

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

  async findCart({ pageNum = 1, pageSize = 10 }) {
    try {
      const { count, rows } = await Cart.findAndCountAll({
        offset: (pageNum - 1) * pageSize,
        limit: pageSize * 1,
        attributes: ["id", "goods_num", "selected"],
        include: [
          {
            model: Goods,
            as: "goods_info",
            attributes: ["id", "goods_name", "goods_price"],
          },
        ],
      });
      console.log("rows ====", rows);
      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,
      };
    } catch (error) {
      console.log("findCart error :>> ", error);
    }
  }

  async updateCarts({ id, number, selected }) {
    try {
      const cart = await Cart.findByPk(id);
      if (number) {
        cart.goods_num = number;
      }
      if (selected) {
        cart.selected = selected;
      }
      return await cart.save();
    } catch (error) {
      console.log("updateCarts error :>> ", error);
    }
  }

  async removeCarts(ids) {
    try {
      return await Cart.destroy({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
    } catch (error) {
      console.log("removeCarts error :>> ", error);
    }
  }
}

module.exports = new CartService();
