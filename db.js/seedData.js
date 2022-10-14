//For the user table
const client = require('./client');
const { createuser } = require ('.api./user');

async function dropTables() {
    console.log('Dropping All Tables...');

    try{

        await client.query (`
        DROP TABLE IF EXISTS users;
        `)
    } catch (error) {
        console.error('Error dropping tables')
        throw error 
    }
}

async function createTables() {
    console.log('Starting to build tables...')

    await client.query(`
     CREATE TABLE users(
        id SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstname VARCHAR(255),
        lastname VARCHAR(255)
     ); 

     CREATE TABLE tracking(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL, 
        description TEXT NOT NULL
     )
    `)
}