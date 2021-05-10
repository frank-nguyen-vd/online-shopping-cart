const router = require('express').Router();
const cartsController = require('./controller');
const jwtService = require('../../services/authentication/jwt-authenticate');

router.post('/', jwtService.authenticate, cartsController.addItem);

router.get('/', jwtService.authenticate, cartsController.view);

module.exports = router;
