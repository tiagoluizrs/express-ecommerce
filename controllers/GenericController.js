class GenericController {
  generatePagination(params) {
    const limit = params.limit ? parseInt(params.limit) : 10,
      page = params.page ? parseInt(params.page) - 1 : 0;

    return [limit, page];
  }

  generateOrder(params) {
    let order = ["id", "ASC"];
    if (params.order) {
      order = params.order.split(",");
    }
    return {
      order: [order],
    };
  }

  generatePin(size=4) {
    return Math.random().toString().substr(2, size);
  }
}

module.exports = GenericController;