const userRepository = require('./repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.create = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await userRepository.findOne({ username });
    if (foundUser) {
        res.status(400).json({
            success: false,
            message: 'This account exists'
        });
        return;
    }
    try {
        const user = await userRepository.create({
            username,
            password,
            role: 'customer'
        });
        res.status(200).json({
            success: true,
            message: 'New user created',
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot create new user'
        });
    }
};
exports.validate = async (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.SECRET_USERNAME &&
        password === process.env.SECRET_PASSWORD
    ) {
        const token = jwt.sign(
            { id: 'MASTER', role: user.role },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            success: true,
            message: 'Welcome MASTER',
            data: { token: token }
        });
    }

    try {
        const user = await userRepository.findOne({ username });
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.SECRET_KEY,
                {
                    expiresIn: '1h'
                }
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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err
        });
    }
};
