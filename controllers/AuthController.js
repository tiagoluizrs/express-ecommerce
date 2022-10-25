const User = require("../models/User");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const Mail = require("../utils/Mail");
const GenericController = require("./GenericController");

class AuthController extends GenericController{
  constructor(){
    super();
    this.mail = new Mail();
  }

  async updatePassword(token, newPassword){
    let user = await User.findOne({
      where: {
        token: token,
      },
    });

    if(user){
      User.update(
        {
          password: bcrypt.hashSync(newPassword, 10),
          token: null
        },
        {
          where: {
            email: user.email,
          },
        }
      );
      return {
        status: 200,
        result: 'Senha alterada com sucesso'
      }
    }
    return {
      status: 404,
      result: 'Token inválido'
    }
  }

  async recoveryPassword(email){
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if(user){
      let token = this.generatePin();
      User.update({
        token: token
      }, {
        where: {
          email: email
        }
      });

      let html = `
                  <h1>Recuperação de senha</h1><br>
                  <p>Olá, o código de verificação é: ${token}, use-o para recuperar sua senha.</p>`;
      this.mail.sendEmail(email, "Recuperação de senha", html);

      return {
        status: 200,
        result: "Solicitação realizada. Em algus instantes você receberá um e-mail.",
      };
    }
    return{
      status: 404,
      result: "Usuário não encontrado."
    }

    
  }

  async login(userEmail, password) {
    // TODO: Adicionar verificação de active no login
    const user = await User.findOne({
      where: {
        [Op.or]: {
          username: userEmail,
          email: userEmail,
        },
      },
    });

    if (user) {
      let passVerify = bcrypt.compareSync(password, user.password);
      if (passVerify){
        return {
          result: {
            msg: "Usuário logado com sucesso",
            token: "123"
          },
          status: 200,
        };
      }
    }
    return {
      result: "Dados inválido.",
      status: 401,
    };
  }
}

module.exports = AuthController;
