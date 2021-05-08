const router = require('express').Router();
const usersController = require('./controller');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post('/', usersController.create);

router.get('/', validateUser, usersController.findAll);

router.post('/login', usersController.authenticate);

module.exports = router;

function validateUser(req, res) {
    jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRET_KEY,
        (err, decode) => {
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
}
