const { Joi, celebrate, isCelebrateError } = require('celebrate');
const validator = require('validator');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.email': 'Поле email должно быть валидным адресом электронной почты',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Поле Пароль должно быть заполнено',
        'string.min': 'В поле Пароль должно быть не менее 8 символов',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле Имя должно быть заполнено',
        'string.min': 'В поле Имя должно быть не менее 2 символов',
        'string.max': 'В поле Имя должно быть не более 30 символов',
      }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.email': 'Поле email должно быть валидным адресом электронной почты',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Поле Пароль должно быть заполнено',
        'string.min': 'В поле Пароль должно быть не менее 8 символов',
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
  })
    .messages({
      'string.empty': 'Поле {#label} должно быть заполнено',
    }),
});

const celebrateErrorsHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({
      message: err.details.get('body').message.replace(/"/g, ''),
    });
  }

  return next(err);
};

module.exports = {
  validateSignin,
  validateSignup,
  validateArticleBody,
  celebrateErrorsHandler,
};
