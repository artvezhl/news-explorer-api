const messages = require('../constants');
const BadRequestError = require('../errors/bad-request-error');

module.exports = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    throw new BadRequestError(messages.passEmpty);
  } else {
    next();
  }
};
