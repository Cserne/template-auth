require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth')
const errorHandler = require('./middleware/errorHandler');
const { default: mongoose } = require("mongoose");
// const {logger} = require('./middleware/logger')

const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: process.env.APP_URL,
    })
);
app.use(express.json()); //A bodyban érkező jsont parse-olni tudja.

app.use(logger);
// app.use(auth); // ha az app.use-nál meghívom az authot, az már a middleware functiont adja vissza

app.get('/api/public', (req, res) => {
    console.log('public');
    res.send('Hello World Public!');
})
    
app.get('/api/private', auth({ block: true }), (req, res) => {
    console.log('private');
    res.send(`Hello World Private id: ${res.locals.userId}`);
})

app.get('/api/prublic', auth({ block: false }), (req, res) => {
    if (!res.locals.userId) return res.send('hello world public');
    res.send(`hello world prublic, your id is: ${res.locals.userId}`);
})
    
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/templateDB', () => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    });
});
