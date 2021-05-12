const transactionRepository = require('./repository');
const cartController = require('../carts/controller');
const Transactions = require('./model');
const { _ } = require('lodash');

exports.find = async (req, res) => {
    const { userId } = req.body;
    let transactions;
    try {
        transactions = await transactionRepository.find(userId);
        res.status(200).json({
            success: true,
            message: 'Transactions are retrieved',
            data: transactions
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Transactions not found'
        });
    }
};
exports.findById = async (req, res) => {
    const { transactionId } = req.body;
    let transaction;
    try {
        transaction = await transactionRepository.findById(transactionId);
        res.status(200).json({
            success: true,
            message: 'Transactions are retrieved',
            data: transaction
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Transactions not found'
        });
    }
};
exports.checkout = async (req, res) => {
    const { userId } = req.body;
    let cart;
    try {
        cart = await cartController.findById(userId);
        if (cart.items.length <= 0) {
            res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
        return;
    }
    try {
        const transaction = new Transactions(cart);
        transaction.timestamp = new Date().toISOString();
        const createdTransaction = await transactionRepository.create(
            _.omit(transaction, 'id')
        );
        await cartController.empty(userId);
        res.status(200).json({
            success: true,
            message: 'Checkout successfully',
            data: createdTransaction
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: true,
            message: 'Internal server error'
        });
    }
};
