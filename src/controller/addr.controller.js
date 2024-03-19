const {
  createAddr,
  findAllAddr,
  updateAddr,
  removeAddr,
  setDefaultAddr,
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

  async remove(ctx) {
    const { id } = ctx.request.params;

    const res = await removeAddr(id);
    ctx.body = {
      code: 0,
      message: "remove addr success",
      result: res,
    };
  }

  async setDefault(ctx) {
    const { id } = ctx.request.params;
    console.log("id :>> ", id);
    const user_id = ctx.state.user.id;
    console.log("user_id :>> ", user_id);

    const res = await setDefaultAddr(user_id, id);

    ctx.body = {
      code: 0,
      message: "set default addr success",
      result: res,
    };
  }
}

module.exports = new AddrController();
