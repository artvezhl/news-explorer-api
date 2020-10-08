const router = require('express').Router();

const { getProfileInfo } = require('../controllers/users');

router.get('/me', getProfileInfo);

module.exports = router;
