const User = require("../models/User");
const { Sequelize } = require("sequelize");
const GenericController = require("./GenericController");
const Op = Sequelize.Op;

class UserController extends GenericController {
  constructor() {
    super();
  }

  async getUsers(params) {
    try {
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
        result = await User.findAll({
          where: {
            [Op.or]: {
              name: {
                [Op.like]: `%${params.q.toLowerCase()}%`,
              },
              email: {
                [Op.like]: `%${params.q.toLowerCase()}%`,
              },
              username: {
                [Op.like]: `%${params.q.toLowerCase()}%`,
              },
            },
          },
          ...order,
          ...paramsLimit,
        });
      } else {
        result = await User.findAll({
          ...order,
          ...paramsLimit,
        });
      }
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema.",
      };
    }
  }

  async getUser(id) {
    try {
      const result = await User.findByPk(id);
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema.",
      };
    }
  }

  async createUser(data) {
    try {
      const user = await User.create(data);
      return {
        status: 200,
        result: `Usuário ${user.id} criado com sucesso!!!`,
      };
    } catch (err) {
      return {
        status: 500,
        result:
          "Um erro genérico ocorreu, contate o administrador do sistema." + err.toString(),
      };
    }
  }

  async updateUser(id, data) {
    try {
      await User.update(data, {
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        result: `Usuário ${id} ataualizado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema.",
      };
    }
  }

  async deleteUser(id) {
    try {
      await User.destroy({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        result: `Usuário ${id} deletado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contate o administrador do sistema.",
      };
    }
  }
}

module.exports = UserController;
