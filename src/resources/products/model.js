const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please include the product name']
    },
    price: {
        type: Number,
        required: [true, 'Please include the product price']
    }
});

const Products = mongoose.model('Products', productSchema);
module.exports = Products;
