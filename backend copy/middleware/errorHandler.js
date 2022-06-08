const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json('Something went wrong'); //ha nincs mögötte .json, akkor sendStatus van status helyett
}

module.exports = errorHandler;