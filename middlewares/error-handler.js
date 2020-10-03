const messages = require('../constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? messages.serverError
        : message.replace(/"/g, ''),
    });
  next();
};
