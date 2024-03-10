const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const User = seq.define("yj_user", {
  // id will be created automatically by sequelize
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

// User.sync({ force: false })
//   .then(() => {
//     console.log("User table created");
//   })
//   .catch((err) => {
//     console.log("User table creation failed", err);
//   });

module.exports = User
