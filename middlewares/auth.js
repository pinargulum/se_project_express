const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const { VALIDATION_ERROR } = require("../utils/constants");

function auth (req, res, next)  {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(VALIDATION_ERROR).send({ message: " Authorization failed " });
  }

  req.user = payload;

  next();
  return
};
module.exports = auth;
