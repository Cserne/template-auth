require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200,
};

const myLogger = (req, res, next) => {
    console.log('Épp logolok...');
    next(); //ezzel hívom meg a következő middleware functiont (a myAuth-ot);
};

const myAuth = (req, res, next) => {
    console.log('Épp autentikálok...');
    const userId = 12;
    res.locals.userId = userId;
    next();
};

const myBusinessLogic = (req, res) => {
    if (!res.locals.userId) return res.sendStatus(401);
    console.log('Épp fut a logikám...');
    res.status(200).json('Oké');
}

app.use(myLogger);
app.use(myAuth);
app.use(myBusinessLogic);
// app.use(cors(corsOptions));
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})