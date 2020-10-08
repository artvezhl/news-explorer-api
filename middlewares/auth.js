const jwt = require('jsonwebtoken');
const messages = require('../constants');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .send({ message: messages.unAuthorized });
  }

  req.user = payload;

  return next();
};
