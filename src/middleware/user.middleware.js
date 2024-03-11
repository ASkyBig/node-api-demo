const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExist,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
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

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  console.log("user_name :>> ", user_name);
  console.log("password :>> ", password);
  try {
    const user = await getUserInfo({ user_name });
    console.log("user :>> ", user);
    if (!user) {
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (error) {
    console.log("error :>> ", error);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }

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
  verifyLogin,
  cryptPassword,
};
