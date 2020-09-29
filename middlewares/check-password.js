module.exports = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    res.status(400)
      .send({ message: 'Поле "пароль" должно быть заполнено' });
  } else {
    next();
  }
};
