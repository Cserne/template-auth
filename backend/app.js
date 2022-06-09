const express = require("express");
require('express-async-errors');
const cors = require("cors");

const auth = require('./middleware/auth')
const errorHandler = require('./middleware/errorHandler');
// const {logger} = require('./middleware/logger')
const dashboardRoute = require('./route/dashboard');
const userRoute = require('./route/user');
const morgan = require('morgan');

const app = express();

app.use(
    cors({
        origin: process.env.APP_URL,
    })
);
app.use(express.json()); //A bodyban érkező jsont parse-olni tudja.

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
);
// app.use(auth); // ha az app.use-nál meghívom az authot, az már a middleware functiont adja vissza

app.use('/api/dashboards', dashboardRoute);
app.use('/api/user', userRoute);

app.get('/api/public', (req, res) => {
    console.log('public');
    res.send('Hello World Public!');
})
    
app.get('/api/private', auth({ block: true }), (req, res) => {
    console.log('private');
    res.send(`Hello World Private id: ${res.locals.user.userId}`);
})

app.get('/api/prublic', auth({ block: false }), (req, res) => {
    if (!res.locals.user) return res.send('hello world public');
    res.send(`hello world prublic, your id is: ${res.locals.userId}`);
})

app.use(errorHandler);

module.exports = app;