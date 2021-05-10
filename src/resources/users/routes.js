const router = require('express').Router();
const usersController = require('./controller');
const jwtService = require('../../services/jwt-authenticate');

router.post('/', usersController.create);

router.get('/', jwtService.authenticate, usersController.findAll);

router.post('/login', usersController.validate);

module.exports = router;
