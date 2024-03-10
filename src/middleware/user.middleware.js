const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExist,
  userRegisterError,
} = require("../constant/err.type");

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  if (!user_name || !password) {
    // ctx.status = 400;
    // ctx.body = {
    //   code: "10001",
    //   message: "user_name or password empty",
    //   result: "",
    // };
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      ctx.app.emit("error", userAlreadyExist, ctx);
      return;
    }
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }

  // if (await getUserInfo({ user_name })) {
  //   // ctx.status = 409;
  //   // ctx.body = {
  //   //   code: "10002",
  //   //   message: "user already exist",
  //   //   result: "",
  //   // };
  //   ctx.app.emit("error", userAlreadyExist, ctx);
  //   return;
  // }
  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
};
