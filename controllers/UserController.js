const User = require("../models/User");
const { Sequelize } = require("sequelize");
const GenericController = require("./GenericController");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const Mail = require("../utils/Mail");

class UserController extends GenericController {
  constructor() {
    super();
    this.mail = new Mail();
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
      data.password = bcrypt.hashSync(data.password, 10);
      data.token = this.generatePin();
      const user = await User.create(data);

      let html = `
                  <h1>Confirmação de e-mail</h1><br>
                  <p>Olá, o código de verificação de e-mail é: ${data.token}, use-o para confirmar sua identidade.</p>`;
      this.mail.sendEmail(data.email, "Validação de e-mail", html);

      return {
        status: 200,
        result: `Usuário ${user.id} criado com sucesso!!!`,
      };
    } catch (err) {
      return {
        status: 500,
        result:
          "Um erro genérico ocorreu, contate o administrador do sistema." +
          err.toString(),
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
