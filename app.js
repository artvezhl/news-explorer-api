const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrateErrorsHandler } = require('./middlewares/validations');
require('dotenv').config();
const { PORT, MONGO_SERVER } = require('./config');

const app = express();
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const commonErrorsHandler = require('./middlewares/error-handler');
const limiter = require('./utils/limiter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключение к Mongo
mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключение логгера запросов
app.use(requestLogger);

app.use(helmet());

app.use(cookieParser());

app.use(limiter);

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
