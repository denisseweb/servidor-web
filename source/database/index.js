const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'cementerio',
  password: 'admin',
  port: 5432,
});

module.exports = { pool }