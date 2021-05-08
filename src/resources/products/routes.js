const router = require('express').Router();
const productsController = require('./controller');
const { requiresAuth } = require('express-openid-connect');

router.post('/', requiresAuth(), productsController.create);

router.get('/', requiresAuth(), productsController.findAll);

router.get('/:id', requiresAuth(), productsController.findById);

router.patch('/:id', requiresAuth(), productsController.updateById);

router.delete('/:id', requiresAuth(), productsController.removeById);

module.exports = router;
