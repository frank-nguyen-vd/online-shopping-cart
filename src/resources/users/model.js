const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please include the username']
    },
    password: {
        type: String,
        required: [true, 'Please include the hashed password']
    },
    role: {
        type: String,
        required: [true, 'Please include the role']
    }
});

// hash user password before saving into database
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
