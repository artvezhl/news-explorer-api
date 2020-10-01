const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { userErrorsHandler, userDataReturner } = require('../utils/helpers');
const BadRequestError = require('../errors/bad-request-error');

// возврат информации о пользователе
module.exports.getProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.send(userDataReturner(user));
  } catch (err) {
    next(err);
  }
};

// создание нового пользователя
module.exports.createUser = async (req, res, next) => {
  try {
    const {
      email, name,
    } = req.body;
    let password;
    let passwordLength;
    if (req.body.password) {
      passwordLength = req.body.password.split(' ').join('').length;
    }
    console.log(passwordLength);
    if (passwordLength > 7) {
      password = await bcrypt.hash(req.body.password, 10);
    } else {
      throw new BadRequestError('В поле "Пароль" должно быть не менее 8 символов');
    }
    const newUser = await User.create({
      email, password, name,
    });

    res
      .status(201)
      .send(userDataReturner(newUser));
  } catch (err) {
    userErrorsHandler(err, res, next);
  }
};

// контроллер login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: foundUser._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .end(token);
  } catch (err) {
    res
      .status(401)
      .send({ message: err.message });
  }
};
