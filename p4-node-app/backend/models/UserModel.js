const mongoose = require('mongoose');

const UserSchema = mongoose.Schema
({
    email :   String,
    password: String,
    username: String
});

module.exports = mongoose.model( 'User', UserSchema );