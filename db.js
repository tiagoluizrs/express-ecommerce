const Sequelize = require('sequelize');

const dbName = 'teste'
const dbUser = 'root';
const dbHost = 'localhost';
const dbPassword = '12345678';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mysql", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
});
module.exports = sequelize;