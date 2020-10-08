const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const messages = require('../constants');

const userErrorsHandler = (e, res, next) => {
  let err = e;
  if (e.name === 'ValidationError' || e.name === 'CastError') {
    err = new BadRequestError(e.message);
  }
  if (e.code === 11000) {
    err = new ConflictError(messages.emailRepeat);
  }
  next(err);
};

const userDataReturner = (object) => {
  const { email, name } = object;

  return { email, name };
};

module.exports = {
  userErrorsHandler,
  userDataReturner,
};
