const router = require('express').Router();
const productsController = require('./controller');

router.post('/', productsController.create);

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.patch('/:id', productsController.updateById);

router.delete('/:id', productsController.removeById);

module.exports = router;
