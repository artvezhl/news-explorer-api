const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    //
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'В поле "Имя" должно быть не менее 2 символов'],
    maxlength: [30, 'В поле "Имя" должно быть не более 30 символов'],
    required: [true, 'Поле "Имя" не является валидным. В нем должно быть от 2 до 30 символов'],
  },
});

// метод для проверки почты и пароля
userSchema.statics.findUserByCredentials = async function (email, password) {
  const foundUser = await this.findOne({ email }).select('+password');
  if (!foundUser) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }

  const comparesPassword = await bcrypt.compare(password, foundUser.password);
  if (!comparesPassword) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }

  return foundUser;
};

// создание модели пользователя
module.exports = mongoose.model('user', userSchema);

