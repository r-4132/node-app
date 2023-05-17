const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    name: String,
    email:    String,
    content: String
});

module.exports = mongoose.model( 'Comment', CommentSchema );
