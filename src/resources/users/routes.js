const router = require('express').Router();
const usersController = require('./controller');

router.post('/', usersController.create);

router.post('/login', usersController.authenticate);

module.exports = router;
