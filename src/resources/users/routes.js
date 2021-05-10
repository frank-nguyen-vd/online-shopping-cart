const router = require('express').Router();
const usersController = require('./controller');
const jwtService = require('../../services/jwt-authenticate');

require('dotenv').config();

router.post('/', jwtService.authenticate, usersController.create);

router.get('/', jwtService.authenticate, usersController.findAll);

router.post('/login', usersController.validate);

module.exports = router;
