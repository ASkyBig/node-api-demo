const { createAddr, findAllAddr } = require("../service/addr.service");

class AddrController {
  async create(ctx) {
    console.log("ctx :>> ", ctx.state.user);
    const { id: user_id } = ctx.state.user;
    const { consignee, phone, address, is_default } = ctx.request.body;
    const res = await createAddr({
      user_id,
      consignee,
      phone,
      address,
      is_default,
    });
    ctx.body = {
      code: 0,
      message: "create addr success",
      result: res,
    };
  }

  async findAll(ctx) {
    const user_id = ctx.state.user.id;
    const res = await findAllAddr(user_id);
    ctx.body = {
      code: 0,
      message: "get addr success",
      result: res,
    };
  }
}

module.exports = new AddrController();
