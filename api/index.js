//Create an api router
//attach other routers from files in this api diectory
//exprot the api router

require('dotenv').config();
const apiRouter = require('express').Router();
const getUserById = require('../db/users')

const userRouter = require('./user');
apiRouter.use('/user', userRouter);
apiRouter.use('/runRebuild', userRouter);

module.exports = { apiRouter };