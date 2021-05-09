const Carts = require('./model');

exports.find = async (customerId) => {
    const cart = await Carts.findOne({ customerId: customerId });
    return cart;
};

exports.update = async (customerId, payload) => {
    const cart = await Carts.findOneAndUpdate(
        { customerId: customerId },
        payload
    );
    return newProduct;
};
