const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'В пароле должно быть не менее 8 символов',
        'string.empty': 'Поле "пароль" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле "имя" должно быть заполнено',
        'string.min': 'В пароле должно быть не менее 2 символов',
        'string.max': 'В пароле должно быть не более 30 символов',
      })
    ,
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'В пароле должно быть не менее 8 символов',
        'string.empty': 'Поле "пароль" должно быть заполнено',
      }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    }),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateArticleBody,
};
