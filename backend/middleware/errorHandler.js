const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(new Error("render error"), error.toString());
    res.status(500).json('Something went wrong'); //ha nincs mögötte .json, akkor sendStatus van status helyett
}

module.exports = errorHandler;
