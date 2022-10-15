//builds and exports unconnected client
const { client } = require('pg');

const DB_NAME = 'day-challenge';

const client = 
    new client (process.env.DATABASE_URL || `postgres: //localhost:5432/${DB_NAME}`);

// const DB_NAME = 'day-challenge';

// const client = new this.client('postgres//localhost:5432/day-challenge');

module.exports = {
    client,
};