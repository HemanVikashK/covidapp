const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "vik&rajan1",
  host: "localhost",
  port: 5432,
  database: "covidapp",
});
module.exports = pool;
