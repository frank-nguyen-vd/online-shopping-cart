const Products = require('./model');

exports.findAll = async () => {
    const products = await Products.find();
    return products;
};

exports.findById = async (id) => {
    const product = await Products.findById(id);
    return product;
};

exports.create = async (payload) => {
    const newProduct = await Products.create(payload);
    return newProduct;
};

exports.update = async (id, payload) => {
    const newProduct = await Products.findByIdAndUpdate(id, payload);
    return newProduct;
};

exports.remove = async (id) => {
    const product = await Products.findByIdAndRemove(id);
    return product;
};
