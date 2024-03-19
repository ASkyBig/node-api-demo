const Address = require("../model/addr.model");

class AddrService {
  async createAddr(addr) {
    try {
      const res = await Address.create(addr);
      return res;
    } catch (error) {
      console.log("createAddr error :>> ", error);
    }
  }

  async findAllAddr(user_id) {
    try {
      const res = await Address.findAll({
        where: {
          user_id,
        },
      });
      return res;
    } catch (error) {
      console.log("findAllAddr error :>> ", error);
    }
  }

  async updateAddr({ id, consignee, phone, address, is_default }) {
    try {
      const res = await Address.update(
        {
          consignee,
          phone,
          address,
          is_default,
        },
        {
          where: {
            id,
          },
        }
      );
      return res;
    } catch (error) {
      console.log("updateAddr error :>> ", error);
    }
  }
}

module.exports = new AddrService();
