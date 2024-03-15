const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Cart = seq.define(
  "yj_carts",
  {
    goods_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    goods_num: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    selected: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

// Cart.sync({ force: true });

module.exports = Cart;
