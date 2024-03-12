class GoodsController {
  async upload(ctx) {
    ctx.body = "This is the goods endpoint";
  }
}

module.exports = new GoodsController();
