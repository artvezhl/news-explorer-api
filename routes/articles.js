const router = require('express').Router();

const {
  getArticles,
  createArticle,
  removeArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:articleId', removeArticle);

module.exports = router;
