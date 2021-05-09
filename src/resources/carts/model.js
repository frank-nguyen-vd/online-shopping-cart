const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    productId: {
        type: String,
        required: [true, 'Please include the product id']
    },
    quantity: {
        type: Number,
        required: [true, 'Please include the number of products']
    },
    subTotal: {
        type: Number,
        required: false
    }
});
const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please include the user id']
    },
    items: {
        type: [productSchema],
        required: false
    },
    totalPrice: {
        type: Number,
        required: false
    }
});

const Carts = mongoose.model('Carts', cartSchema);
module.exports = Carts;
