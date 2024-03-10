const { createUser, getUserInfo } = require("../service/user.service");
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

    if (!user_name || !password) {
      ctx.status = 400;
      ctx.body = {
        code: '10001',
        message: 'user_name or password empty',
        result: ''
      }
      return;
    }

    if (await getUserInfo({user_name})) {
      ctx.status = 409;
      ctx.body = {
        code: '10002',
        message: 'user already exist',
        result: ''
      }
      return;
    }

    const res = await createUser(user_name, password);
    console.log("res :>> ", res);
    ctx.body = {
      code: 0,
      message: "register success",
      result: {
        id: res.id,
        user_name: res.user_name
      }
    }
  }

  async login(ctx) {
    ctx.body = "This is the users endpoint";
  }
}

module.exports = new UserController();
