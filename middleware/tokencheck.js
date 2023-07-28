const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm'

module.exports = function () {
    return function (req, resp, next) {
        let token = req.headers['authorization'];
        if (token) {
            token = token.split(' ')[1];
            Jwt.verify(token, jwtkey, (err, valid) => {
                if (err) {
                    resp.status(401).send({ result: 'please provide valid token' })
                } else {
                    next()
                }
            })
        } else {
            resp.status(403).send({ result: 'please add token with error' })
        }
    }
}
