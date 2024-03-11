const { createUser, getUserInfo } = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");

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
    ctx.body = `Hello ${user_name}`;
  }
}

module.exports = new UserController();
