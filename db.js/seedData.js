//For the user table
const client = require('./client');
const { createUser } = require ('./users');

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
        sessionsCompleted VARCHAR(255) UNIQUE NOT NULL, 
        repCount TEXT NOT NULL,
        FOREIGN KEY (usersID) REFERENCES (userID)
     );
    `)
}

/*

Seed Data

*/

async function createInitialUsers() {
    
    try {
        const usersToCreate = [
            {
            username: "justincl",
            email: "justin53@yahoo.com",
            password: "Dox63Wrv$0y",
            firstname: "Justin",
            lastname: "Clark",
            },
            {
            username: "walsh",
            email: "walshcarrie@gmail.com",
            password: "Sk$jZi5BH@",
            firstname: "Carrie",
            lastname: "Walsh",
            },
            {
            username: "jp",
            email: "getafterit@hotmail.com",
            password: "#3t@fter75B",
            firstname: "John",
            lastname: "Paul",
            },
            {
            username: "britts",
            email: "bmarks@gmail.com",
            password: "8%I77any@M",
            firstname: "Brittany",
            lastname: "Marks",
            },
            {
            username: "",
            email: "",
            password: "D0x63Wr$0y",
            firstname: "Cassandra",
            lastname: "Morales",
            }
        ] 
        const users = await Promise.all(usersToCreate.map(createUser));

        console.log('Users created');
        console.log(users);
        console.log('Finished creating users!')
    } catch (error) {
        console.error('Error crating users!')
        throw error;
    }
};

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
};

module.exports = {
    rebuildDB
};