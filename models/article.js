const mongoose = require('mongoose');
const validator = require('validator');

const messages = require('../constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, messages.invalidArticleData],
  },
  title: {
    type: String,
    required: [true, messages.invalidArticleData],
  },
  text: {
    type: String,
    required: [true, messages.invalidArticleData],
  },
  date: {
    type: String,
    required: [true, messages.invalidArticleData],
  },
  source: {
    type: String,
    required: [true, messages.invalidArticleData],
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: [true, messages.invalidArticleData],
  },
  image: {
    type: String,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
    },
    required: [true, messages.invalidArticleData],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, messages.invalidArticleData],
    select: false,
  },
});

// создание модели статьи
module.exports = mongoose.model('article', articleSchema);
