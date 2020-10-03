const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { login, createUser } = require('../controllers/users');
const { validateSignin, validateSignup } = require('../middlewares/validations');
const checkPassword = require('../middlewares/check-password');
const messages = require('../constants');

router.post('/signin', validateSignin, checkPassword, login);
router.post('/signup', validateSignup, checkPassword, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res) => {
  res.status(404).send({ message: messages.pageUnfound });
});

module.exports = router;
