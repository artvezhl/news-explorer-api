# news-explorer-api
Backend for Yandex Praktikum graduate program

Ссылка на проект - [https://api.explore-news.ga/](https://api.explore-news.ga/)

### В проекте реализованы роуты: 
- GET /users/me, который возвращает информацию о пользователе (email и имя)
- GET /articles, который возвращает все сохранённые пользователем статьи
- POST /articles, который создает статью с переданными в теле keyword, title, text, date, source, link и image
- DELETE /articles/articleId, который удаляет сохранённую статью  по _id

### В проекте применяется:
- защита роутов авторизацией
- валидация входящих данных как на уровне модели, так и до передачи данных на сервер

## Стек технологий:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/ru/)
- [Mongoose](https://mongoosejs.com/)
- База данных [MongoDB](https://www.mongodb.com/)

## Пакеты которые используются в сборках:
- [Eslint](https://www.npmjs.com/package/eslint) with [AirBnb base config](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [celebrate](https://www.npmjs.com/package/celebrate)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-winston](https://www.npmjs.com/package/express-winston)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [validator](https://www.npmjs.com/package/validator)
- [winston](https://www.npmjs.com/package/winston)

## Инструкции по запуску:
- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - `npm i`
- Запустить в development режиме - `npm run dev`
- Запустить сборку production-билда - `npm run build`

## Что планируется доработать в рамках проекта:

