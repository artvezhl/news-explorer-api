const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const messages = require('../constants');
const { NODE_ENV, JWT_SECRET } = require('../config');
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
    if (passwordLength > 7) {
      password = await bcrypt.hash(req.body.password, 10);
    } else {
      throw new BadRequestError(messages.passMinLength);
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

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//         { expiresIn: '7d' });
//       res.cookie('jwt', token, {
//         maxAge: 3600000 * 24 * 7,
//         httpOnly: true,
//       });
//       return res.send({ token });
//     })
//     .catch(next);
// };

// контроллер login
module.exports.login = async (req, res, next) => {
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
      });
    return res.send({ token });
  } catch (err) {
    userErrorsHandler(err, res, next);
  }
};
