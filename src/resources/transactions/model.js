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
const transactionSchema = mongoose.Schema({
    customerId: {
        type: String,
        required: [true, 'Please include the user id']
    },
    items: {
        type: [productSchema],
        required: [true, 'Please include list of items']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please specify total price']
    },
    timestamp: {
        type: String,
        required: [true, 'Please specify date time']
    }
});

const Transactions = mongoose.model('Transactions', transactionSchema);
module.exports = Transactions;
