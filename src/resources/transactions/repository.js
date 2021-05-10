const Transactions = require('./model');

exports.create = async (payload) => {
    const transaction = await Transactions.create(payload);
    return transaction;
};

exports.find = async (customerId) => {
    const transactions = await Transactions.find({ customerId: customerId });
    return transactions;
};

exports.findById = async (transactionId) => {
    const transaction = await Transactions.findById(transactionId);
    return transaction;
};
