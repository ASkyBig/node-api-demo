const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const User = seq.define("yj_user", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.sync({ force: true }).then(() => {
  console.log("User table created");
});
