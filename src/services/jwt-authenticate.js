const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.authenticate = async (req, res) => {
    await jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            } else {
                req.body.userId = decoded.id;
            }
        }
    );
};
