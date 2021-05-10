const router = require('express').Router();
const productsController = require('./controller');
const jwtService = require('../../services/jwt-authenticate');

router.post('/', jwtService.authenticate, productsController.create);

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.patch('/:id', jwtService.authenticate, productsController.updateById);

router.delete('/:id', jwtService.authenticate, productsController.removeById);

module.exports = router;
