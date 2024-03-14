const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.default");
const {
  TokenExpiredError,
  invalidToken,
  hasNotAdminPermission,
} = require("../constant/err.type");
const { getUserInfo } = require("../service/user.service");

const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  console.log("token :>> ", token);

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const res = await getUserInfo({ user_name: user.user_name });
    ctx.state.user = res;
  } catch (error) {
    console.log("auth error :>> ", error);
    switch (error.name) {
      case "TokenExpiredError":
        return ctx.app.emit("error", TokenExpiredError, ctx);

      case "JsonWebTokenError":
        return ctx.app.emit("error", invalidToken, ctx);

      default:
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }
  await next();
};

const hasAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    return ctx.app.emit("error", hasNotAdminPermission, ctx);
  }
  await next();
};

module.exports = {
  auth,
  hasAdminPermission,
};
