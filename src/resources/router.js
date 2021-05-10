const productsRoutes = require('./products/routes');
const usersRoutes = require('./users/routes');
const cartsRoutes = require('./carts/routes');

module.exports = (app) => {
    app.use('/products', productsRoutes);
};
module.exports = (app) => {
    app.use('/users', usersRoutes);
};

module.exports = (app) => {
    app.use('/carts', cartsRoutes);
};
