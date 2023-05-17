const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    name: String,
    email:    String,
    content: String,
    rating: Number,
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model( 'Comment', CommentSchema );
