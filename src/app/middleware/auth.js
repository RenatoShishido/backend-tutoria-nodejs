const jwt = require('jsonwebtoken')
require("dotenv/config")

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token)
        return res.status(401).send({ error: "Token nao enviado" })


    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.status(401).send({ error: "Token invalido" })

        req.userId = decoded.id;
        return next();
    })
}
