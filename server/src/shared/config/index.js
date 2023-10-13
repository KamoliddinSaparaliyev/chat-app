require("dotenv/config");

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
