const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.default");
const { TokenExpiredError, invalidToken } = require("../constant/err.type");

const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  console.log("token :>> ", token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log("user :>> ", user);
    ctx.state.user = user;
  } catch (error) {
    console.log("error :>> ", error);
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

module.exports = {
  auth,
};
