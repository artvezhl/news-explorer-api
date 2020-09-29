const Article = require('../models/article');

// возврат всех карточек
module.exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user._id });

    res.send(articles);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
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
    res.send(newArticle);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message);
      return;
    }
    next(err);
  }
};

// удаление карточки
module.exports.removeArticle = async (req, res, next) => {
  try {
    let articleToRemove = await Article.findById(req.params.articleId).select('+owner');
    if (req.user._id.toString() === articleToRemove.owner.toString()) {
      articleToRemove = await Article.findByIdAndRemove(req.params.articleId);
    } else {
      res.status(401).send({ message: 'У Вас нет прав на удаление этой статьи' });
      return;
    }
    if (articleToRemove === null) {
      res.status(404).send({ message: `Статья с номером ${req.params.articleId} отсутствует` });
      return;
    }
    res.send(articleToRemove);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Id статьи не является валидным' });
      return;
    }
    next(err);
  }
};
