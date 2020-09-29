const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { login, createUser } = require('../controllers/users');
const { validateSignin, validateSignup } = require('../middlewares/validations');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному адресу не найдена' });
});

module.exports = router;
