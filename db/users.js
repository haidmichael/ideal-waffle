const client = require('./client');
const bcrypt = require('bcrypt');

async function getAllUsers() {
    try {
        const { rows: user } = await client.query(
            `
                SELECT * FROM users
            `,  
        );
        return user;
    } catch (error) {
        throw error;
    }
}

const createUser = async({ username, email, password, firstname, lastname }) => {
    try{
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const { rows: [ user ]  } = await client.client.query(
            `
                INSERT INTO users (username, email, password, firstname, lastname)
                VALUES($1, $2, $3, $4, $5)
                ON CONFLICT (username) DO NOTHING
                RETURNING id, username, email, password, firstname, lastname;
            `,
            [ username, email, password, firstname, lastname ]
        );

        password = hashedPassword;
        return user;
    } catch (error) {
        throw error;
    }
};

const getUser = async({ username, password }) => {
    try {
        const user = await this.getUserByUsername(username);
        if(!user) {
            return '';
        } 
        const hashedPassword = user.password;
        const verifyPassword = await bcrypt.compare(password, hashedPassword);

        if (verifyPassword) {
            delete user.password;
            return user;
        } else {
            return '';
        }
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    const { rows: [ user ] } = await client.query(
        `
            SELECT * FROM users
            WHERE id = $1
        `,
        [ id ]  
    );
    return user;
};

const getUserByUsername = async (username) => {
    try {
        const { rows: [ user ] } = await client.query(
            `
                SELECT * FROM users
                WHERE username = $1;
            `,
            [ username ]   
        );
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllUsers, createUser, getUser, getUserById, getUserByUsername }