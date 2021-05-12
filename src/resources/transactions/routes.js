const router = require('express').Router();
const transactionsController = require('./controller');
const jwtService = require('../../services/jwt-authenticate');

router.post('/', jwtService.authenticate, transactionsController.checkout);

router.get('/', jwtService.authenticate, transactionsController.find);

module.exports = router;
