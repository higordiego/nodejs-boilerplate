
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_TYPE,
  logging: false,
  minifyAliases: true,
  pool: {
    max: 100,
    min: 0,
    idle: 10000
  }
}
