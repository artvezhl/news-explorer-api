const {
  NODE_ENV,
  JWT_SECRET = 'dev-secret',
  PORT = 3000,
  MONGO_SERVER = 'mongodb://localhost:27017/news-explorer',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, PORT, MONGO_SERVER,
};
