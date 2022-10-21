const Product = require('../models/Product');
const { Sequelize } = require("sequelize");
const GenericController = require('./GenericController');
const Op = Sequelize.Op;

class ProductController extends GenericController {
  constructor() {
    super();
  }

  async getProducts(params) {
    try{
      let result;
      const pagination = this.generatePagination(params),
        limit = pagination[0],
        page = pagination[1];

      const paramsLimit = {
        offset: page * limit,
        limit: parseInt(limit),
      };
      const order = this.generateOrder(params);

      if (params.q) {
        result = await Product.findAll({
          where: {
            name: {
              [Op.like]: `%${params.q.toLowerCase()}%`,
            },
          },
          ...order,
          ...paramsLimit,
        });
      } else {
        result = await Product.findAll({
          ...paramsLimit,
          ...order
        });
      }
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema." + err.toString()
      };
    }
  }

  async getProduct(id) {
    try{
      const result = await Product.findByPk(id);
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema."
      };
    }
  }

  async createProduct(data) {
    try{
      const product = await Product.create(data);
      return {
        status: 200,
        result: `Produto ${product.id} criado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema."
      };
    }
  }

  async updateProduct(id, data) {
    try{
      await Product.update(data, {
        where: {
          id: id
        }
      });
      return {
        status: 200,
        result: `Producto ${id} atualizado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema."
      };
    }
  }

  async deleteProduct(id) {
    try{
      await Product.destroy({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        result: `Produto ${id} deletado com sucesso!`
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema."
      };
    }
  }
}

module.exports = ProductController;