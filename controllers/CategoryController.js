const Category = require("../models/Category");
const { Sequelize } = require("sequelize");
const GenericController = require("./GenericController");
const Op = Sequelize.Op;

class CategoryController extends GenericController{
  constructor(){
    super();
  }

  async getCategories(params) {
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
        result = await Category.findAll({
          where: {
            name: {
              [Op.like]: `%${params.q.toLowerCase()}%`,
            },
          },
          ...order,
          ...paramsLimit,
        });
      } else {
        result = await Category.findAll({
          ...order,
          ...paramsLimit
        });
      }
      return {
        status: 200,
        result: result
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema."
      };
    }
  }

  async getCategory(id) {
    try {
      const result = await Category.findByPk(id);
      return {
        status: 200,
        result: result
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema.",
      };
    }
  }

  async createCategory(data){
    try{
      const category = await Category.create(data);
      return {
        status: 200,
        result: `Categoria ${category.id} criada com sucesso!!!`
      };
    }catch(err){
      return {
        status: 500,
        result: 'Um erro genérico ocorreu, contate o administrador do sistema.'
      }
    }
  }

  async updateCategory(id, data) {
    try{
      await Category.update(data, {
        where: {
          id: id
        }
      });
      return {
        status: 200,
        result: `Categoria ${id} ataualizada com sucesso!`
      };
    }catch(err){
      return {
        status: 500,
        result: 'Um erro genérico ocorreu, contate o administrador do sistema.'
      }
    }
  }

  async deleteCategory(id) {
    try{
      await Category.destroy({
        where: {
          id: id
        }
      });
      return {
        status: 200,
        result: `Categoria ${id} deletada com sucesso!`,
      };
    }catch(err){
      return {
        status: 500,
        result: 'Um erro genérico ocorreu, contate o administrador do sistema.'
      }
    }
  }
}

module.exports = CategoryController;
