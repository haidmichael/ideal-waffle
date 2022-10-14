//builds and exports unconnected client
const { Client } = require('pg');

const DB_NAME = 'thirtyDayChallenge';

const DB_URL = 
    process.env.DATABASE_URL || `postgres: //localhost:5432/ ${DB_NAME}`;

let client;

module.exports = client;