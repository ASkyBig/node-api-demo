const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DB: process.env.MYSQL_DB,
  JWT_SECRET: process.env.JWT_SECRET,
};
