const router = require('express').Router();

const { validateArticleBody, validateArticleId } = require('../middlewares/validations');

const {
  getArticles,
  createArticle,
  removeArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/:articleId', validateArticleId, removeArticle);

module.exports = router;
