const logger = (req, res, next) => {
    console.log('Épp logolok...');
    next(); //ezzel hívom meg a következő middleware functiont (a auth-t);
};

module.exports = logger;

// exports.logger = (req, res, next) => {
//     console.log('Épp logolok...');
//     next(); //ezzel hívom meg a következő middleware functiont (a auth-t);
// };
