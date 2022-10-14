//builds and exports unconnected client
const { Client } = require('pg');

const DB_NAME = 'day-challenge';

const client = 
    new Client (process.env.DATABASE_URL || `postgres: //localhost:5432/ ${DB_NAME}`);

module.exports = client;