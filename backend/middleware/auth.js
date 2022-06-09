const jwt = require('jsonwebtoken');

const auth = ({ block }) => (req, res, next) => {    // kivesszük a headerből a userId-t
    // console.log('Épp autentikálok...');
    const token = req.header('authorization'); //https://expressjs.com/en/api.html#req.get
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error && block) {
            console.log(error);
            return res.sendStatus(401)
        };

        res.locals.user = user;
        next();
    });
}

// const auth = (middlewareParams) => (req, res, next) => {    // kivesszük a headerből a userId-t
//     // console.log('Épp autentikálok...');
//     const token = req.header('authorization'); //https://expressjs.com/en/api.html#req.get
//     jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
//         if (error && middlewareParams.block) {
//             console.log(error);
//             return res.sendStatus(401)
//         };

//         res.locals.user = user;
//         next();
//     });
// }

module.exports = auth;