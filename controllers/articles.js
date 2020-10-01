const Article = require('../models/article');
const { userErrorsHandler } = require('../utils/helpers');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');

// возврат всех статей
module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    next();
  }
};

// создание карточки
module.exports.createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  try {
    const newArticle = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });
    res
      .status(201)
      .send(newArticle);
  } catch (err) {
    userErrorsHandler(err, res, next);
  }
};

// удаление карточки
module.exports.removeArticle = async (req, res, next) => {
  try {
    let articleToRemove = await Article.findById(req.params.articleId).select('+owner')
      .orFail(() => {
        throw new NotFoundError('Статья с заданным Id отсутствует');
      });
    if (req.user._id.toString() === articleToRemove.owner.toString()) {
      articleToRemove = await Article.findByIdAndRemove(req.params.articleId);
    } else {
      throw new ForbiddenError('У Вас нет прав на удаление этой статьи');
    }
    res.send(articleToRemove);
  } catch (err) {
    let error = err;
    if (err.name === 'CastError') {
      error = new BadRequestError('Id статьи не является валидным');
    }
    next(error);
  }
};
