const Category = require("../models/Category");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

class CategoryController {
 async  getCategories(params) {
    let result;
    const limit = parseInt(params.limit),
          page = parseInt(params.page) - 1;

    const paramsLimit = {
      offset: page * limit,
      limit: parseInt(limit),
    };

    if(params.q){
      result = await Category.findAll({
        where: {
          name: {
            [Op.like]: `%${params.q.toLowerCase()}%`,
          },
        },
        ...paramsLimit,
      });
    }else{
      result = await Category.findAll(paramsLimit);
    }
    
    return result;
  }

  async getCategory(id) {
    const result = await Category.findByPk(id);
    return result;
  }

  async updateCategory(id, data){
    return `Atualizando a categoria ${id}`;
  }

  async deleteCategory(id){
    return `Deletando a categoria ${id}`;
  }
}

module.exports = CategoryController;
