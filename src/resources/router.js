const productsRoutes = require('./products/routes');
const usersRoutes = require('./users/routes');
const cartsRoutes = require('./carts/routes');

module.exports = (app) => {
    app.use('/users', usersRoutes);
    app.use('/products', productsRoutes);
    app.use('/carts', cartsRoutes);
};
