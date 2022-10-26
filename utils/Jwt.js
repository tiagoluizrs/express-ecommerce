require("dotenv").config();
const jwt = require("jsonwebtoken");

class Jwt {
  generateToken(data) {
    return jwt.sign(
      {
        data: data,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
        algorithm: "HS256",
      }
    );
  }

  verifyToken(token) {
    if(token === undefined){
      return {
        result: "Você precisa passar um token",
        status: 400
      }
    }

    token = token.replace("jwt ", "");
    try{
      return {
        result: jwt.verify(token, process.env.SECRET_KEY),
        status: 200
      }
    }catch(err){
      if (err.toString() === "TokenExpiredError: jwt expired") {
        return {
          result: "Token expirado",
          status: 401,
        };
      } else {
        return {
          result: err,
          status: 500,
        };
      }
    }
  }
}

module.exports = Jwt;
