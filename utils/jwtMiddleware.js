const JwtConfig = require("./jwtConfig");
const JWT = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let userToken = req.headers["authorization"];
  if (userToken) {
    JWT.verify(
      userToken,
      JwtConfig.secret,
      {
        algorithm: JwtConfig.algorithm,
      },
      (error, data) => {
        if (error) {
          return res.status(401).json({
            message: "Token is not valid",
            data: error,
          });
        } else {
          req.user = data;
          next();
        }
      }
    );
  } else {
    return res.status(400).json({
      message: "Please provide authentication token value",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
