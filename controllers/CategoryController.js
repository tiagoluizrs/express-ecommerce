const Category = require("../models/Category");

class CategoryController {
 async  getCategories(params) {
    const result = await Category.findAll();
    return result;
  }

  async getCategory(id) {
    const result = await Category.findByPk(id);
    return result;
  }
}

module.exports = CategoryController;
