const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-error');
const messages = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, messages.invalidEmail],
    unique: [true, messages.emailRepeat],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: [true, messages.passEmpty],
    minlength: [8, messages.passMinLength],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, messages.nameMinLength],
    maxlength: [30, messages.nameMaxLength],
    required: [true, messages.nameEmpty],
  },
});

// метод для проверки почты и пароля
userSchema.statics.findUserByCredentials = async function (email, password) {
  const foundUser = await this.findOne({ email }).select('+password');
  if (!foundUser) {
    throw new UnauthorizedError(messages.invalidEmailAndPass);
  }

  const comparesPassword = await bcrypt.compare(password, foundUser.password);
  if (!comparesPassword) {
    throw new UnauthorizedError(messages.invalidEmailAndPass);
  }

  return foundUser;
};

// создание модели пользователя
module.exports = mongoose.model('user', userSchema);
