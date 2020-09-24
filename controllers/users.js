const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const userErrorsHandler = require('../utils/helpers');

// возврат информации о пользователе
module.exports.getProfileInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // TODO think about next error
    if (user === null) {
      res.status(404).send({ message: `Пользователь с номером ${req.user._id} отсутствует` });
      return;
    }

    const data = (object) => {
      const { email, name } = object;

      return { email, name };
    };

    res.send(data(user));
  } catch (err) {
    // TODO think about next error
    if (err.name === 'CastError') {
      res.status(400).send({ message: `Пользователь с номером ${req.user._id} отсутствует` });
    }
  }
};

// создание нового пользователя
module.exports.createUser = async (req, res) => {
  try {
    const {
      email, name,
    } = req.body;
    let password;
    let passwordLength;
    if (req.body.password) {
      passwordLength = req.body.password.split(' ').join('').length;
    }
    if (passwordLength > 7) {
      password = await bcrypt.hash(req.body.password, 10);
    }
    const newUser = await User.create({
      email, password, name,
    });

    const data = (object) => {
      const {
        email, name, ...rest
      } = object;

      return {
        email, name,
      };
    };

    res.send(data(newUser));
  } catch (err) {
    userErrorsHandler(err, res);
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
