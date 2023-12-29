const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    lists: [{type: String}]
})

const User = mongoose.model('users', userSchema);
module.exports = User;