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
}

module.exports = new AddrService();
