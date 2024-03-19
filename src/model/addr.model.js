const seq = require("../db/seq");
const { DataTypes } = require("sequelize");

const Address = seq.define("yj_address", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

// Address.sync({ force: true });

module.exports = Address;
