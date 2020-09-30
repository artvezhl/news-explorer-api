const BadRequestError = require('../errors/bad-request-error');

const userErrorsHandler = (e, res, next) => {
  let err;
  if (e.name === 'ValidationError' || e.name === 'CastError') {
    err = new BadRequestError(e.message);
  }
  if (e.code === 11000) {
    err = new Error('Пользователь с такой почтой уже есть зарегистрирован');
    err.statusCode = 409;
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
