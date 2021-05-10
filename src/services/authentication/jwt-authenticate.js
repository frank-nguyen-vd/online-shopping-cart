const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.decode = async (jwt_token) => {
    return await jwt.verify(
        jwt_token,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) {
                throw err;
            }
            return decoded;
        }
    );
};
exports.authenticate = async (req, res, next) => {
    try {
        const bearer_token = req.headers['authorization'];
        const jwt_token = bearer_token.split(' ')[1];
        const decode = await this.decode(jwt_token);
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
