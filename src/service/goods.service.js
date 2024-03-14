const Goods = require("../model/goods.model");

class GoodsService {
  async createGoods(data) {
    const res = await Goods.create(data);
    return res.dataValues;
  }

  async updateGoods(id, data) {
    const res = await Goods.update(data, {
      where: {
        id,
      },
    });
    console.log("updateGoods -> res", res);
    return res[0] > 0;
  }

  async removeGoods(id) {
    const res = await Goods.destroy({
      where: {
        id,
      },
    });
    console.log("removeGoods -> res", res);
    return res;
  }

  async restoreGoods(id) {
    const res = await Goods.restore({
      where: {
        id,
      },
    });
    console.log("restoreGoods -> res", res);
    return res;
  }
}

module.exports = new GoodsService(); // Path: src/service/goods.service.js
