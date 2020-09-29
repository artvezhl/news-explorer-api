const router = require('express').Router();

const { validateArticleBody } = require('../middlewares/validations');

const {
  getArticles,
  createArticle,
  removeArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/:articleId', removeArticle);

module.exports = router;
