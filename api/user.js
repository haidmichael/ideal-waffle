//Express router

const userRouter = require('express').Router();
const seedData = require('../db/seedData')

//Test route
userRouter.use((req, res, next) => {
    console.log("A request is being made to /users route");
    next();
  });

userRouter.get('/find', async(req, res, next) => {
    res.send('Your in the User API')
});

userRouter.post('/runRebuild', async (req, res, next) => {
    const user = await seedData.rebuildDB();

    res.send('thumbs up!')
})

module.exports = { userRouter };