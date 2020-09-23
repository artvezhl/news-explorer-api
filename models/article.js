const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isUrl(link);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isUrl(link);
      },
    },
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

// создание модели статьи
module.exports = mongoose.model('article', articleSchema);
