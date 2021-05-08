const Users = require('./model');

exports.findAll = async () => {
    const users = await Users.find();
    return users;
};

exports.findById = async (id) => {
    const user = await Users.findById(id);
    return user;
};

exports.create = async (payload) => {
    const newUser = await Users.create(payload);
    return newUser;
};

exports.updateById = async (id, payload) => {
    const newUser = await Users.findByIdAndUpdate(id, payload);
    return newUser;
};

exports.removeById = async (id) => {
    const user = await Users.findByIdAndRemove(id);
    return user;
};

exports.findOne = async (payload) => {
    const user = await Users.findOne(payload);
    return user;
};
