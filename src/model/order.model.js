const seq = require("../db/seq");
const { DataTypes } = require("sequelize");

const Order = seq.define("yj_orders", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  order_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false,
  },
});

// Order.sync({ force: true });

module.exports = Order;
