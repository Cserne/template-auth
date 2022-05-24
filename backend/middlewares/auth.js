const auth = (middlewareParams) => (req, res, next) => {
        console.log('Épp autentikálok...');
        const userId = req.header('authorization'); //https://expressjs.com/en/api.html#req.get
        res.locals.userId = userId;
        if (middlewareParams.block && !res.locals.userId) return res.sendStatus(401);
        next();
}

module.exports = auth;