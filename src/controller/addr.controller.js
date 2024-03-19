const {
  createAddr,
  findAllAddr,
  updateAddr,
} = require("../service/addr.service");

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

  async update(ctx) {
    const { id } = ctx.request.params;
    const { consignee, phone, address, is_default = 0 } = ctx.request.body;
    const res = await updateAddr({
      id,
      consignee,
      phone,
      address,
      is_default,
    });
    ctx.body = {
      code: 0,
      message: "update addr success",
      result: res,
    };
  }
}

module.exports = new AddrController();
