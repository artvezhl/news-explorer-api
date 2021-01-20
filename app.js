const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrateErrorsHandler } = require('./middlewares/validations');
require('dotenv').config();

const whitelist = [
  'http://localhost:8080',
  'http://diploma-web.tk',
  'https://diploma-web.tk',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
    'credentials',
  ],
  credentials: true,
};

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

app.use('*', cors(corsOptions));

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
