// TODO разобраться почему не работает данный мидлвар
module.exports = (req, res, next) => {
  console.log('password');
  const { password } = req.body;
  if (!password || !password.trim()) {
    res.status(400)
      .send({ message: 'Поле "пароль" должно быть заполнено' });
  } else {
    next();
  }
};
