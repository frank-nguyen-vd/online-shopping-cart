const Users = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    create: (req, res, next) => {
        Users.create(
            {
                username: req.body.username,
                password: req.body.password
            },
            (err, result) => {
                if (err) next(err);
                else {
                    res.status(200).json({
                        success: true,
                        message: 'New user created'
                    });
                }
            }
        );
    },
    authenticate: (req, res, next) => {
        Users.findOne({ username: req.body.username }, (err, userInfo) => {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign(
                        { id: userInfo.id },
                        process.env.SECRET_KEY,
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({
                        success: true,
                        message: 'Log in successfuly',
                        data: { token: token }
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Invalid username and password'
                    });
                }
            }
        });
    }
};
