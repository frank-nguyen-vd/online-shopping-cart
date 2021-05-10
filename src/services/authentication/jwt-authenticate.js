const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.decode = async (jwtToken) => {
    return await jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            throw err;
        }
        return decode;
    });
};

exports.getToken = (req) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken === undefined) return undefined;
    const jwtToken = bearerToken.split(' ')[1];
    return jwtToken;
};

exports.authenticate = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const jwtToken = bearerToken.split(' ')[1];
        const decode = await this.decode(jwtToken);
        req.body.userId = decode.userId;
        req.body.role = decode.role;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
