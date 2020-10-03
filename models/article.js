const mongoose = require('mongoose');
const validator = require('validator');

const messages = require('../constants');
// TODO нужны ли сообщения для валидации данных по статье?
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле "keyword" должно быть заполнено'],
  },
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
  },
  text: {
    type: String,
    required: [true, 'Поле "text" должно быть заполнено'],
  },
  date: {
    type: String,
    required: [true, 'Поле "date" должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле "source" должно быть заполнено'],
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: [true, messages.invalidLinkUrl],
  },
  image: {
    type: String,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
    },
    required: [true, messages.invalidImageUrl],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "keyword" должно быть заполнено'],
    select: false,
  },
});

// создание модели статьи
module.exports = mongoose.model('article', articleSchema);
