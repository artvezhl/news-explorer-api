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

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 200,
//   allowedHeaders: [
//     'Content-Type',
//     'origin',
//     'x-access-token',
//     'authorization',
//     'credentials',
//   ],
//   credentials: true,
// };

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

app.use('*', cors(corsOptionsDelegate), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' });
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
