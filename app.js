const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrateErrorsHandler } = require('./middlewares/validations');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const commonErrorsHandler = require('./middlewares/error-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO проверить Eslint
// подключение к Mongo
mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключение логгера запросов
app.use(requestLogger);

app.use(cookieParser());

// роуты
app.use(routes);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок celebrate
app.use(celebrateErrorsHandler);

// обработчик ошибок
app.use(commonErrorsHandler);

// запуск сервера на локальном порте (по-умолчанию localhost:3000)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
