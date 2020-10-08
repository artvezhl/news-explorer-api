const { Joi, celebrate, isCelebrateError } = require('celebrate');
const validator = require('validator');
const messages = require('../constants');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': messages.emailEmpty,
        'string.email': messages.invalidEmail,
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': messages.passEmpty,
        'string.min': messages.passMinLength,
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': messages.nameEmpty,
        'string.min': messages.nameMinLength,
        'string.max': messages.nameMaxLength,
      }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': messages.emailEmpty,
        'string.email': messages.invalidEmail,
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': messages.passEmpty,
        'string.min': messages.passMinLength,
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
      return helpers.message(messages.invalidArticleData);
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(messages.invalidArticleData);
    }),
  })
    .messages({
      'string.empty': messages.invalidArticleData,
    }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().hex(),
  })
    .messages({
      'string.hex': messages.invalidId,
    }),
});

const celebrateErrorsHandler = (err, req, res, next) => {
  if (isCelebrateError(err) && err.details.get('body')) {
    return res.status(400).send({
      message: err.details.get('body').message.replace(/"/g, ''),
    });
  }
  if (isCelebrateError(err) && err.details.get('params')) {
    return res.status(400).send({
      message: err.details.get('params').message.replace(/"/g, ''),
    });
  }

  return next(err);
};

module.exports = {
  validateSignin,
  validateSignup,
  validateArticleBody,
  validateArticleId,
  celebrateErrorsHandler,
};
