const Product = require('../models/Product');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

class ProductController{
    async getProducts(params){
      let result;
      const limit = parseInt(params.limit),
            page = parseInt(params.page) - 1;

      const paramsLimit = {
        offset: page * limit,
        limit: parseInt(limit),
      };
      
      if (params.q) {
        result = await Product.findAll({
          where: {
            name: {
              [Op.like]: `%${params.q.toLowerCase()}%`,
            },
          },
          ...paramsLimit,
        });
      }else{
        result = await Product.findAll(paramsLimit);
      }
      return result;
    }

    async getProduct(id){
      const result = await Product.findByPk(id);
      return result;
    }

    async updateProduct(id, data){

    }

    async deleteProduct(id){
      
    }
}

module.exports = ProductController;