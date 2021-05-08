const productsRoutes = require('./products/routes');
const usersRoutes = require('./users/routes');

module.exports = (app) => {
    app.use('/products', productsRoutes);
};
module.exports = (app) => {
    app.use('/users', usersRoutes);
};
