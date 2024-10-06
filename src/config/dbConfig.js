const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
    connectionString: config.db.url,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };
