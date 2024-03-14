const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Goods = seq.define(
  "yj_goods",
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goods_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
//node .\src\model\goods.model.js
// Goods.sync({ force: true });

module.exports = Goods;
