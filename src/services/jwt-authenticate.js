const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.authenticate = async (req, res, next) => {
    try {
        const bearer_token = req.headers['authorization'];
        const jwt_token = bearer_token.split(' ')[1];

        await jwt.verify(jwt_token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            } else {
                req.body.userId = decoded.id;
                next();
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
