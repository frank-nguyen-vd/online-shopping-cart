const productsRoutes = require('./products/routes');

module.exports = (app) => {
    app.use('/products', productsRoutes);
};
