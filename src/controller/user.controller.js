const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");
const { JWT_SECRET } = require("../config.default");

class UserController {
  // constructor({ userService }) {
  //   this.userService = userService;
  // }
  // async createUser(req, res) {
  //   const user = await this.userService.createUser(req.body);
  //   res.status(201).send(user);
  // }
  async register(ctx, next) {
    // console.log(ctx.request.body);
    // ctx.body = ctx.request.body;
    const { user_name, password } = ctx.request.body;

    // if (!user_name || !password) {
    //   ctx.status = 400;
    //   ctx.body = {
    //     code: '10001',
    //     message: 'user_name or password empty',
    //     result: ''
    //   }
    //   return;
    // }

    // if (await getUserInfo({user_name})) {
    //   ctx.status = 409;
    //   ctx.body = {
    //     code: '10002',
    //     message: 'user already exist',
    //     result: ''
    //   }
    //   return;
    // }
    try {
      const res = await createUser(user_name, password);
      console.log("res :>> ", res);
      ctx.body = {
        code: 0,
        message: "register success",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  async login(ctx) {
    const { user_name } = ctx.request.body;
    console.log("user_name :>> ", user_name);
    try {
      const res = await getUserInfo({ user_name });
      if (!res) {
        ctx.app.emit("error", userDoesNotExist, ctx);
        return;
      }
      const token = jwt.sign(
        {
          id: res.id,
          // user_name: res.user_name,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
      ctx.body = {
        code: 0,
        message: "login success",
        result: {
          id: res.id,
          user_name: res.user_name,
          token,
        },
      };
    } catch (error) {
      console.log("login error :>> ", error);
      ctx.app.emit("error", userLoginError, ctx);
    }
  }

  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    console.log("id :>> ", id);
    console.log("password :>> ", password);
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "change password success",
        result: "",
      };
    } else {
      ctx.app.emit("error", userChangePasswordError, ctx);
    }
    // try {
    //   const res = await updateUser(id, password);
    //   ctx.body = {
    //     code: 0,
    //     message: "change password success",
    //     result: {
    //       id: res.id,
    //       user_name: res.user_name,
    //     },
    //   };
    // } catch (error) {
    //   ctx.app.emit("error", userChangePasswordError, ctx);
    // }
    // const { user_name, password } = ctx.request.body;
    // try {
    //   const res = await updateUser(user_name, password);
    //   ctx.body = {
    //     code: 0,
    //     message: "change password success",
    //     result: {
    //       id: res.id,
    //       user_name: res.user_name,
    //     },
    //   };
    // } catch (error) {
    //   ctx.app.emit("error", userChangePasswordError, ctx);
    // }
  }
}

module.exports = new UserController();
