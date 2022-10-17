// Express server
require('dotenv').config();

const PORT = 3000; 

const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// const userRouter = require('./api/user')
// app.use('/runRebuild', userRouter);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const { userRouter } = require('./api/user');
app.use('/user', userRouter);

// const { apiRouter } = require('./api/index');
// app.use('/api', apiRouter);

const { client } = require('./db/client.js');
//client.connect();

// Two test routes 
app.get('/test', (req, res, next) => { 
    res.send('<h1>Hi, Im a test route!</h1>')
})
// app.get('/', (req, res, next) => {
//     res.send('Hello World!')
// });

app.get('*', (req, res, next) => {
    res.status(404);
    res.send({ error: 'Route not found!' });
});

app.use((error, req, res, next) => {
    res.status(500);
    console.log(error, '500 status error');
    res.send({ error: error });
});

app.listen(PORT, () => {
    console.log(`I am working down here on port...${PORT}`);
});

