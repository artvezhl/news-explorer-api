module.exports = (err, req, res, next) => {
  console.log('we are in commonerrorshandleRRRRR!!!!!!');
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
